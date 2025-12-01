"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractMapper = void 0;
const contract_entity_1 = require("../../2_domain/entities/contract/contract.entity");
const contract_enum_1 = require("../../2_domain/entities/contract/contract.enum");
class ContractMapper {
    static toCreateData(entity) {
        const contractData = entity.toCreateData();
        const meetingsData = entity.meetings.map((m) => ({
            date: m.date,
            alarms: m.alarms,
        }));
        return {
            contract: contractData,
            meetings: meetingsData,
        };
    }
    static toUpdateData(entity) {
        const contractData = entity.toUpdateData();
        const meetingsData = entity.meetings.map((m) => ({
            date: m.date,
            alarms: m.alarms,
        }));
        const meeting = meetingsData.length > 0
            ? {
                deleteMany: {},
                create: meetingsData,
            }
            : undefined;
        const docsData = entity.contractDocuments.map((d) => ({
            id: d.id,
            fileName: d.fileName,
        }));
        const contractDocuments = docsData.length > 0 ? docsData : undefined;
        return {
            contract: contractData,
            meeting,
            contractDocuments,
        };
    }
    static toPersistEntity(record) {
        const meetings = record.meeting?.map((m) => ({
            id: m.id,
            contractId: m.contractId,
            date: m.date,
            version: m.version,
            alarms: m.alarms,
        })) ?? [];
        return contract_entity_1.ContractEntity.createPersist({
            ...record,
            status: this.toDomainStatus(String(record.status)),
            meetings,
            contractDocuments: record.contractDocuments ?? [],
        });
    }
    static toResponse(entity, relations) {
        return {
            id: entity.id,
            status: entity.status,
            resolutionDate: entity.resolutionDate
                ? this.formatDateTime(entity.resolutionDate)
                : null,
            contractPrice: entity.contractPrice,
            meetings: entity.meetings.map((m) => ({
                date: this.formatDateTime(m.date),
                alarms: m.alarms.map((alarmEnum) => this.formatDateTime(this.calculateAlarmTime(m.date, alarmEnum))),
            })),
            contractDocuments: entity.contractDocuments.map((d) => ({
                id: d.id,
                fileName: d.fileName,
            })),
            user: relations?.user ?? { id: entity.user?.id, name: entity.user?.name },
            customer: relations?.customer ?? {
                id: entity.customer?.id,
                name: entity.customer?.name,
            },
            car: relations?.car ?? { id: entity.car?.id, model: entity.car?.model },
        };
    }
    // private static formatDate(date: Date): string {
    //   return date.toISOString().slice(0, 10); // YYYY-MM-DD
    // }
    static formatDateTime(date) {
        return ([
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0"),
        ].join("-") +
            "T" +
            [
                String(date.getHours()).padStart(2, "0"),
                String(date.getMinutes()).padStart(2, "0"),
                String(date.getSeconds()).padStart(2, "0"),
            ].join(":"));
    }
    static toCreateResponse(entity, relations) {
        const resolutionDate = entity.resolutionDate
            ? this.formatDateTime(entity.resolutionDate)
            : this.formatDateTime(this.getDefaultResolutionDate(entity));
        return {
            id: entity.id,
            status: entity.status,
            resolutionDate,
            contractPrice: entity.contractPrice,
            meetings: entity.meetings.map((m) => ({
                date: this.formatDateTime(m.date),
                alarms: m.alarms.map((alarmEnum) => this.formatDateTime(this.calculateAlarmTime(m.date, alarmEnum))),
            })),
            user: relations?.user ?? { id: entity.userId },
            customer: relations?.customer ?? { id: entity.customerId },
            car: relations?.car ?? { id: entity.carId },
        };
    }
    static getDefaultResolutionDate(entity) {
        const meeting = entity.meetings[0];
        return new Date(meeting.date.getFullYear(), meeting.date.getMonth(), meeting.date.getDate(), 9, 0, 0, 0);
    }
    static calculateAlarmTime(meetingDate, type) {
        const base = new Date(meetingDate.getFullYear(), meetingDate.getMonth(), meetingDate.getDate(), 9, 0, 0, 0);
        if (type === contract_enum_1.AlarmTime.DAY_BEFORE_9AM) {
            base.setDate(base.getDate() - 1);
        }
        return base;
    }
    static toDomainStatus(raw) {
        switch (raw) {
            case "CAR_INSPECTION":
            case "carInspection":
                return contract_enum_1.ContractStatus.CAR_INSPECTION;
            case "PRICE_NEGOTIATION":
            case "priceNegotiation":
                return contract_enum_1.ContractStatus.PRICE_NEGOTIATION;
            case "CONTRACT_DRAFT":
            case "contractDraft":
                return contract_enum_1.ContractStatus.CONTRACT_DRAFT;
            case "CONTRACT_SUCCESSFUL":
            case "contractSuccessful":
                return contract_enum_1.ContractStatus.CONTRACT_SUCCESSFUL;
            case "CONTRACT_FAILED":
            case "contractFailed":
                return contract_enum_1.ContractStatus.CONTRACT_FAILED;
            default:
                throw new Error(`Unknown contract status from DB: ${raw}`);
        }
    }
}
exports.ContractMapper = ContractMapper;
//# sourceMappingURL=contract.mapper.js.map