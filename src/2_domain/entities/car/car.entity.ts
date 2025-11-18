import { CarManufacturer, CarStatus, CarType } from "@prisma/client";

export type CreateCarData = {
  carNumber: string;
  manufacturer: CarManufacturer;
  model: string;
  type: CarType;
  manufacturingYear: number;
  mileage: number;
  price: number;
  accidentCount: number;
  explanation?: string | null;
  accidentDetails?: string | null;
  status: CarStatus;
  version: number;
  companyId: number;
};

export type UpdateCarData = Partial<CreateCarData>;

export type PersistCarRecord = {
  id: number;
  carNumber: string;
  manufacturer: CarManufacturer;
  model: string;
  type: CarType;
  manufacturingYear: number;
  mileage: number;
  price: number;
  accidentCount: number;
  explanation: string | null;
  accidentDetails: string | null;
  status: CarStatus;
  version: number;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;
};

export class CarEntity {
  private readonly _id?: number;
  private readonly _companyId: number;

  private _carNumber: string;
  private _manufacturer: CarManufacturer;
  private _model: string;
  private _type: CarType;
  private _manufacturingYear: number;
  private _mileage: number;
  private _price: number;
  private _accidentCount: number;
  private _explanation: string | null;
  private _accidentDetails: string | null;
  private _status: CarStatus;
  private _version: number;

  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    carNumber: string;
    manufacturer: CarManufacturer;
    model: string;
    type: CarType;
    manufacturingYear: number;
    mileage: number;
    price: number;
    accidentCount: number;
    explanation?: string | null;
    accidentDetails?: string | null;
    status: CarStatus;
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
    this._explanation = attrs.explanation ?? null;
    this._accidentDetails = attrs.accidentDetails ?? null;
    this._status = attrs.status;
    this._version = attrs.version;
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
  get version() {
    return this._version;
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

  private static calculateType(
    manufacturer: CarManufacturer,
    model: string,
  ): CarType {
    if (["스파크"].includes(model)) return CarType.COMPACT;
    if (["K3", "K5", "K7", "K8", "K9"].includes(model)) return CarType.SEDAN;
    return CarType.SUV;
  }

  static create(params: CreateCarData): CarEntity {
    return new CarEntity({
      ...params,
      type: CarEntity.calculateType(params.manufacturer, params.model),
      status: CarStatus.POSSESSION,
      version: 1,
    });
  }

  static update(existing: CarEntity, params: UpdateCarData): CarEntity {
    const base = existing.toPersistence();

    const merged: PersistCarRecord = {
      ...base,
      ...params,
      version: existing.version + 1,
    };

    if (params.manufacturer || params.model) {
      merged.type = CarEntity.calculateType(
        params.manufacturer ?? existing.manufacturer,
        params.model ?? existing.model,
      );
    }

    return new CarEntity(merged);
  }

  static fromPersistence(record: PersistCarRecord): CarEntity {
    return new CarEntity(record);
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
      status: this._status,
      version: this._version,
      companyId: this._companyId,
    };
  }

  toUpdateData(): UpdateCarData {
    return {
      carNumber: this._carNumber,
      manufacturer: this._manufacturer,
      model: this._model,
      manufacturingYear: this._manufacturingYear,
      mileage: this._mileage,
      price: this._price,
      accidentCount: this._accidentCount,
      explanation: this._explanation,
      accidentDetails: this._accidentDetails,
    };
  }

  toPersistence(): PersistCarRecord {
    return {
      id: this._id!,
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
      companyId: this._companyId,
      createdAt: this._createdAt!,
      updatedAt: this._updatedAt!,
    };
  }
}
