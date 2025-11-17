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
  status: string;
  version: number;
  companyId: number;
};

export type UpdateCarData = Partial<CreateCarData> & {
  version: number;
};

export type PersistCarRecord = {
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
  createdAt: Date;
  updatedAt: Date;
};

export class CarEntity {
  private readonly _id?: number;
  private readonly _companyId: number;

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
    status: string;
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


// 공장 메소드
  //Create (POST /cars)
  static create(params: Omit<CreateCarData, "status" | "version">): CarEntity {
    return new CarEntity({
      ...params,
      status: "possession",
      version: 1,
    });
  }

  //Update (PATCH /cars/:id)
  static update(existing: CarEntity, params: UpdateCarData): CarEntity {
    return new CarEntity({
      ...existing.toPersistence(),
      ...params,
      version: existing.version + 1,
    });
  }

  //database record → Entity
  static fromPersistence(record: PersistCarRecord): CarEntity {
    return new CarEntity(record);
  }

// 변환기
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
