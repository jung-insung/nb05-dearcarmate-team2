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
  explanation: string | null;
  accidentDetails: string | null;
  status: CarStatus;
  version: number;
  companyId: number;
};

export type PersistCarRecord = CreateCarData & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export class CarEntity {
  static fromPersistence(record: PersistCarRecord): CarEntity {
    return new CarEntity(record);
  }

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

  constructor(
    attrs:
      | PersistCarRecord
      | Omit<PersistCarRecord, "id" | "createdAt" | "updatedAt">,
  ) {
    this._id = "id" in attrs ? attrs.id : undefined;

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

    this._createdAt = "createdAt" in attrs ? attrs.createdAt : undefined;
    this._updatedAt = "updatedAt" in attrs ? attrs.updatedAt : undefined;
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

  static create(req: {
    carNumber: string;
    manufacturer: CarManufacturer;
    model: string;
    manufacturingYear: number;
    mileage: number;
    price: number;
    accidentCount: number;
    explanation: string | null;
    accidentDetails: string | null;
    companyId: number;
  }): CarEntity {
    return new CarEntity({
      ...req,
      type: CarEntity.calculateType(req.manufacturer, req.model),
      status: CarStatus.POSSESSION,
      version: 1,
    });
  }

  static update(existing: CarEntity, req: Partial<CreateCarData>): CarEntity {
    const base = existing.toPersistence();
    const merged = {
      ...base,
      ...req,
      version: existing.version + 1,
    };

    if (req.model || req.manufacturer) {
      merged.type = CarEntity.calculateType(
        req.manufacturer ?? existing.manufacturer,
        req.model ?? existing.model,
      );
    }

    return new CarEntity(merged);
  }

  private static calculateType(
    _manufacturer: CarManufacturer,
    model: string,
  ): CarType {
    if (["스파크"].includes(model)) return CarType.COMPACT;
    if (["K3", "K5", "K7", "K8", "K9"].includes(model)) return CarType.SEDAN;
    return CarType.SUV;
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

  // updateMany 조건용
  toUpdateData(): Omit<PersistCarRecord, "id" | "createdAt" | "updatedAt"> {
    return this.toCreateData();
  }

  toPersistence(): PersistCarRecord {
    return {
      id: this._id!,
      createdAt: this._createdAt!,
      updatedAt: this._updatedAt!,
      ...this.toCreateData(),
    };
  }
}
