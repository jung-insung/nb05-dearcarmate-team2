import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";
import { ContractStatus } from "./contract.enum";
import {
  ContractEn,
  ContractUpdateEn,
  NewContractEn,
  PersistContractEn,
  ContractCreateData,
  ContractUpdateData,
  NewMeetingParams,
  ContractDocumentEn,
} from "./contract.entity.util";
import { MeetingEntity } from "./meeting.entity";

export type NewContractEntity = ContractEntity;
export type PersistContractEntity = ContractEntity & { readonly id: number };

export class ContractEntity {
  private readonly _id?: number;
  private _userId: number;
  private _carId: number;
  private _customerId: number;
  private readonly _companyId: number;
  private _status: ContractStatus;
  private _resolutionDate: Date | null;
  private _contractPrice: number;
  private _version: number;
  private _meetings: MeetingEntity[];
  private _contractDocuments: ContractDocumentEn[];

  constructor(attrs: ContractEn) {
    this._id = attrs.id;
    this._userId = attrs.userId;
    this._carId = attrs.carId;
    this._customerId = attrs.customerId;
    this._companyId = attrs.companyId;
    this._status = attrs.status;
    this._resolutionDate = attrs.resolutionDate ? new Date(attrs.resolutionDate) : null;
    this._contractPrice = attrs.contractPrice;
    this._version = attrs.version ?? 1;
    this._meetings = attrs.meetings?.map((m) => new MeetingEntity(m)) ?? [];
    this._contractDocuments = attrs.contractDocuments ?? [];
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

  static createNew(params: NewContractEn): ContractEntity {
    const { meetings, ...otherParams } = params;
    const contract = new ContractEntity({
      ...otherParams,
      status: ContractStatus.CAR_INSPECTION,
    });

    if (meetings && meetings.length > 0) {
      contract.replaceMeetings(meetings);
    }

    return contract;
  }

  static createPersist(attrs: PersistContractEn): ContractEntity {
    return new ContractEntity(attrs);
  }

  update(params: ContractUpdateEn): void {
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
      this._resolutionDate = params.resolutionDate ? new Date(params.resolutionDate) : null;
    }
    if (params.contractPrice !== undefined) {
      this._contractPrice = params.contractPrice;
    }
    if (params.meetings) {
      this.replaceMeetings(params.meetings);
    }
  }

  private replaceMeetings(meetingParams: NewMeetingParams[]) {
    if (meetingParams.length > 3) {
      throw new BusinessException({
        type: BusinessExceptionType.MEETING_COUNT,
      });
    }
    this._meetings = meetingParams.map((params) =>
      MeetingEntity.createNew(params),
    );
  }

  toCreateData(): ContractCreateData {
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

  toUpdateData(): ContractUpdateData {
    return this.toCreateData();
  }
}
