import { ContractEntity } from "../../2_domain/entities/contract/contract.entity";
import { AlarmTime } from "../../2_domain/entities/contract/contract.enum";
import {
  ContractRecord,
  MeetingEn,
} from "../../2_domain/entities/contract/contract.entity.util";

export class ContractMapper {
  static toCreateData(entity: ContractEntity) {
    const contractData = entity.toCreateData();

    const meetingsData = entity.meetings.map((m) => ({
      date: m.date,
      alarms: m.alarms as any,
    }));

    return {
      contract: contractData,
      meetings: meetingsData,
    };
  }

  static toUpdateData(entity: ContractEntity) {
    const contractData = entity.toUpdateData();

    const meetingsData = entity.meetings.map((m) => ({
      date: m.date,
      alarms: m.alarms as any,
    }));

    return {
      contract: contractData,
      meeting: {
        deleteMany: {},
        create: meetingsData,
      },
    };
  }

  static toPersistEntity(record: ContractRecord): ContractEntity {
    const meetings: MeetingEn[] =
      record.meeting?.map((m) => ({
        id: m.id,
        contractId: m.contractId,
        date: m.date,
        version: m.version,
        alarms: m.alarms,
      })) ?? [];

    return ContractEntity.createPersist({
      ...record,
      meetings,
      contractDocuments: record.contractDocuments ?? [],
    });
  }

  static toResponse(
    entity: ContractEntity,
    relations?: {
      user?: { id: number; name: string };
      customer?: { id: number; name: string };
      car?: { id: number; model: string };
    },
  ) {
    return {
      id: entity.id,
      status: entity.status,

      resolutionDate: entity.resolutionDate
        ? this.formatDateTime(entity.resolutionDate)
        : null,

      contractPrice: entity.contractPrice,
      meetings: entity.meetings.map((m) => ({
        date: this.formatDate(m.date),

        alarms: m.alarms.map((alarmEnum) =>
          this.formatDateTime(this.calculateAlarmTime(m.date, alarmEnum)),
        ),
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

  private static formatDate(date: Date): string {
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  private static formatDateTime(date: Date): string {
    return (
      [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-") +
      "T" +
      [
        String(date.getHours()).padStart(2, "0"),
        String(date.getMinutes()).padStart(2, "0"),
        String(date.getSeconds()).padStart(2, "0"),
      ].join(":")
    );
  }

  static toCreateResponse(
    entity: ContractEntity,
    relations?: {
      user?: { id: number; name: string };
      customer?: { id: number; name: string };
      car?: { id: number; model: string };
    },
  ) {
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
        alarms: m.alarms.map((alarmEnum) =>
          this.formatDateTime(this.calculateAlarmTime(m.date, alarmEnum)),
        ),
      })),

      user: relations?.user ?? { id: entity.userId },
      customer: relations?.customer ?? { id: entity.customerId },
      car: relations?.car ?? { id: entity.carId },
    };
  }

  private static getDefaultResolutionDate(entity: ContractEntity): Date {
    const meeting = entity.meetings[0];
    return new Date(
      meeting.date.getFullYear(),
      meeting.date.getMonth(),
      meeting.date.getDate(),
      9,
      0,
      0,
      0,
    );
  }

  private static calculateAlarmTime(meetingDate: Date, type: AlarmTime): Date {
    const base = new Date(
      meetingDate.getFullYear(),
      meetingDate.getMonth(),
      meetingDate.getDate(),
      9,
      0,
      0,
      0,
    );

    if (type === AlarmTime.DAY_BEFORE_9AM) {
      base.setDate(base.getDate() - 1);
    }

    return base;
  }
}
