"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractEntity = void 0;
const business_exception_1 = require("../../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../../4_shared/exceptions/business.exceptions/exception-info");
const contract_enum_1 = require("./contract.enum");
const meeting_entity_1 = require("./meeting.entity");
class ContractEntity {
    constructor(attrs) {
        this._id = attrs.id;
        this._userId = attrs.userId;
        this._carId = attrs.carId;
        this._customerId = attrs.customerId;
        this._companyId = attrs.companyId;
        this._status = attrs.status;
        this._resolutionDate = attrs.resolutionDate
            ? new Date(attrs.resolutionDate)
            : null;
        this._contractPrice = attrs.contractPrice;
        this._version = attrs.version ?? 1;
        this._meetings = attrs.meetings?.map((m) => new meeting_entity_1.MeetingEntity(m)) ?? [];
        this._contractDocuments = attrs.contractDocuments ?? [];
        this._user = attrs.user;
        this._customer = attrs.customer;
        this._car = attrs.car;
    }
    get id() {
        return this._id;
    }
    get userId() {
        return this._userId;
    }
    get carId() {
        return this._carId;
    }
    get customerId() {
        return this._customerId;
    }
    get companyId() {
        return this._companyId;
    }
    get status() {
        return this._status;
    }
    get resolutionDate() {
        return this._resolutionDate;
    }
    get contractPrice() {
        return this._contractPrice;
    }
    get version() {
        return this._version;
    }
    get meetings() {
        return this._meetings;
    }
    get contractDocuments() {
        return this._contractDocuments;
    }
    get user() {
        return this._user;
    }
    get customer() {
        return this._customer;
    }
    get car() {
        return this._car;
    }
    static createNew(params) {
        const { meetings, resolutionDate, ...otherParams } = params;
        const contract = new ContractEntity({
            ...otherParams,
            status: contract_enum_1.ContractStatus.CAR_INSPECTION,
            resolutionDate: resolutionDate ?? null,
        });
        if (meetings && meetings.length > 0) {
            contract.replaceMeetings(meetings);
        }
        return contract;
    }
    static createPersist(attrs) {
        return new ContractEntity(attrs);
    }
    update(params) {
        if (params.userId) {
            this._userId = params.userId;
        }
        if (params.customerId) {
            this._customerId = params.customerId;
        }
        if (params.carId) {
            this._carId = params.carId;
        }
        if (params.status) {
            this._status = params.status;
        }
        if (params.resolutionDate !== undefined) {
            this._resolutionDate = params.resolutionDate
                ? new Date(params.resolutionDate)
                : null;
        }
        if (params.contractPrice !== undefined) {
            this._contractPrice = params.contractPrice;
        }
        if (params.meetings !== undefined) {
            this.replaceMeetings(params.meetings);
        }
        if (params.contractDocuments) {
            this._contractDocuments = params.contractDocuments;
        }
    }
    replaceMeetings(meetingParams) {
        if (meetingParams.length > 3) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.MEETING_COUNT,
            });
        }
        this._meetings = meetingParams.map((params) => meeting_entity_1.MeetingEntity.createNew(params));
    }
    toCreateData() {
        return {
            userId: this._userId,
            carId: this._carId,
            customerId: this._customerId,
            companyId: this._companyId,
            status: this._status,
            resolutionDate: this._resolutionDate,
            contractPrice: this._contractPrice,
        };
    }
    toUpdateData() {
        return {
            userId: this._userId,
            carId: this._carId,
            customerId: this._customerId,
            companyId: this._companyId,
            status: this._status,
            resolutionDate: this._resolutionDate,
            contractPrice: this._contractPrice,
            version: this._version,
        };
    }
}
exports.ContractEntity = ContractEntity;
//# sourceMappingURL=contract.entity.js.map