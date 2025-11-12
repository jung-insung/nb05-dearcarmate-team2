import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionTable, BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";

export type CreateCarData = {
  carNumber: string;
  manufacturer: string;
  model: string;
  type: string;
  manufacturingYear: number;
  mileage: number;
  price: number;
  accidentCount: number;
  explanation?: string;
  accidentDetails?: string;
  version: number;
  companyId: number;
};

export type UpdateCarData = {
  carNumber?: string;
  manufacturer?: string;
  model?: string;
  type?: string;
  manufacturingYear?: number;
  mileage?: number;
  price?: number;
  accidentCount?: number;
  explanation?: string;
  accidentDetails?: string;
  status?: string;
  version: number;
};

export type NewCarEntity = CarEntity
export type UpdateCarEntity = CarEntity

export class CarEntity {
  private readonly _id?: number;
  private _carNumber: string;
  private _manufacturer: string;
  private _model: string;
  private _type: string;
  private _manufacturingYear: number;
  private _mileage: number;
  private _price: number;
  private _accidentCount: number;
  private _explanation?: string;
  private _accidentDetails?: string;
  private _status: string;
  private _version: number;
  private _isModified: boolean;
  private readonly _companyId: number;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    carNumber: string;
    manufacturer: string;
    model: string;
    type: string;
    manufacturingYear: number;
    mileage: number;
    price: number;
    accidentCount: number;
    explanation?: string;
    accidentDetails?: string;
    status?: string;
    version: number;
    companyId: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = attrs.id;
    this._carNumber = attrs.carNumber;
    this._manufacturer = attrs.manufacturer;
    this._model = attrs.model;
    this._type = attrs.type;
    this._manufacturingYear = attrs.manufacturingYear;
    this._mileage = attrs.mileage;
    this._price = attrs.price;
    this._accidentCount = attrs.accidentCount;
    this._explanation = attrs.explanation;
    this._accidentDetails = attrs.accidentDetails;
    this._status = attrs.status ?? "possession";
    this._version = attrs.version;
    this._isModified = false;
    this._companyId = attrs.companyId;
    this._createdAt = attrs.createdAt;
    this._updatedAt = attrs.updatedAt;
  }

  get id() {
    return this._id;
  }
  get carNumber() {
    return this._carNumber;
  }
  get manufacturer() {
    return this._manufacturer;
  }
  get model() {
    return this._model;
  }
  get type() {
    return this._type;
  }
  get manufacturingYear() {
    return this._manufacturingYear;
  }
  get mileage() {
    return this._mileage;
  }
  get price() {
    return this._price;
  }
  get accidentCount() {
    return this._accidentCount;
  }
  get explanation() {
    return this._explanation;
  }
  get accidentDetails() {
    return this._accidentDetails;
  }
  get status() {
    return this._status;
  }
  get companyId() {
    return this._companyId;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get isModified() {
    return this._isModified;
  }

  toCreateData(): CreateCarData {
    return {
      carNumber: this._carNumber,
      manufacturer: this._manufacturer,
      model: this._model,
      type: this._type,
      manufacturingYear: this._manufacturingYear,
      mileage: this._mileage,
      price: this._price,
      accidentCount: this._accidentCount,
      explanation: this._explanation,
      accidentDetails: this._accidentDetails,
      version: this._version,
      companyId: this._companyId,
    };
  }

  toUpdateData(): UpdateCarData {
    return {
      carNumber: this._carNumber,
      manufacturer: this._manufacturer,
      model: this._model,
      type: this._type,
      manufacturingYear: this._manufacturingYear,
      mileage: this._mileage,
      price: this._price,
      accidentCount: this._accidentCount,
      explanation: this._explanation,
      accidentDetails: this._accidentDetails,
      status: this._status,
      version: this._version,
    };
  }

  static createCar(params: {
    carNumber: string;
    manufacturer: string;
    model: string;
    type: string;
    manufacturingYear: number;
    mileage: number;
    price: number;
    accidentCount?: number;
    explanation?: string;
    accidentDetails?: string;
    companyId: number;
  }): NewCarEntity {
    const {
      carNumber,
      manufacturer,
      model,
      type,
      manufacturingYear,
      mileage,
      price,
      accidentCount,
      explanation,
      accidentDetails,
      companyId,
    } = params;

    this.checkCarNumberRule(carNumber);
    this.checkPriceRule(price);
    this.checkMileageRule(mileage);

    return new CarEntity({
      carNumber,
      manufacturer,
      model,
      type,
      manufacturingYear,
      mileage,
      price,
      accidentCount: accidentCount ?? 0,
      explanation,
      accidentDetails,
      version: 1,
      status: "possession",
      companyId,
    });
  }

  static updateCar(params: {
    id: number;
    carNumber: string;
    manufacturer: string;
    model: string;
    type: string;
    manufacturingYear: number;
    mileage: number;
    price: number;
    accidentCount: number;
    explanation?: string;
    accidentDetails?: string;
    status: string;
    version: number;
    companyId: number;
  }): UpdateCarEntity {
    const {
      id,
      carNumber,
      manufacturer,
      model,
      type,
      manufacturingYear,
      mileage,
      price,
      accidentCount,
      explanation,
      accidentDetails,
      status,
      version,
      companyId,
    } = params;

    this.checkCarNumberRule(carNumber);
    this.checkPriceRule(price);
    this.checkMileageRule(mileage);

    return new CarEntity({
      id,
      carNumber,
      manufacturer,
      model,
      type,
      manufacturingYear,
      mileage,
      price,
      accidentCount,
      explanation,
      accidentDetails,
      status,
      version: version + 1,
      companyId,
    });
  }

  private static checkCarNumberRule(carNumber: string): void {
    const regex = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
    if (!regex.test(carNumber)) {
      throw new BusinessException({
        type: BusinessExceptionType.INVALID_CAR_NUMBER,
      });
    }
  }

  private static checkPriceRule(price: number): void {
    if (price < 0) {
      throw new BusinessException({
        type: BusinessExceptionType.INVALID_PRICE,
      });
    }
  }

  private static checkMileageRule(mileage: number): void {
    if (mileage < 0) {
      throw new BusinessException({
        type: BusinessExceptionType.INVALID_MILEAGE,
      });
    }
  }

  incrementVersion() {
    if (this._isModified) {
      this._version++;
    }
  }
}
