import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";
import {
  CustomerAgeGroup,
  CustomerGender,
  CustomerRegion,
} from "./customer.enum";

export type NewCustomerEntity = Omit<
  CustomerEntity,
  "id" | "createdAt" | "updatedAt" | "contracCount" | "version"
>;

export type UpdateCustomerEntity = Omit<
  CustomerEntity,
  "id" | "createdAt" | "updatedAt" | "contracCount"
>;

export interface PersistCustomerEntity extends CustomerEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CustomerEntity {
  private readonly _id?: number;
  private _name: string;
  private _gender: CustomerGender;
  private _phoneNumber: string;
  private _ageGroup?: CustomerAgeGroup;
  private _region?: CustomerRegion;
  private _email: string;
  private _memo?: string;
  private _contractCount: number;
  private _version: number;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    name: string;
    gender: CustomerGender;
    phoneNumber: string;
    ageGroup?: CustomerAgeGroup;
    region?: CustomerRegion;
    email: string;
    memo?: string;
    contractCount?: number;
    version?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = attrs.id;
    this._name = attrs.name;
    this._gender = attrs.gender;
    this._phoneNumber = attrs.phoneNumber;
    this._ageGroup = attrs.ageGroup;
    this._region = attrs.region;
    this._email = attrs.email;
    this._memo = attrs.memo;
    this._contractCount = attrs.contractCount ?? 0;
    this._version = attrs.version ?? 1;
    this._createdAt = attrs.createdAt;
    this._updatedAt = attrs.updatedAt;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get gender() {
    return this._gender;
  }
  get phoneNumber() {
    return this._phoneNumber;
  }
  get ageGroup() {
    return this._ageGroup;
  }
  get region() {
    return this._region;
  }
  get email() {
    return this._email;
  }
  get memo() {
    return this._memo;
  }
  get contractCount() {
    return this._contractCount;
  }
  get version() {
    return this._version;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  static createNew(params: {
    name: string;
    gender: CustomerGender;
    phoneNumber: string;
    ageGroup?: CustomerAgeGroup;
    region?: CustomerRegion;
    email: string;
    memo?: string;
  }): NewCustomerEntity {
    const { name, gender, phoneNumber, ageGroup, region, email, memo } = params;

    this.checkNameRule(name);

    return new CustomerEntity({
      name,
      gender,
      phoneNumber,
      ageGroup,
      region,
      email,
      memo,
    });
  }

  static update(params: {
    name: string;
    gender: CustomerGender;
    phoneNumber: string;
    ageGroup?: CustomerAgeGroup;
    region?: CustomerRegion;
    email: string;
    memo?: string;
    version: number;
  }): UpdateCustomerEntity {
    const {
      name,
      gender,
      phoneNumber,
      ageGroup,
      region,
      email,
      memo,
      version,
    } = params;

    return new CustomerEntity({
      name,
      gender,
      phoneNumber,
      ageGroup,
      region,
      email,
      memo,
      version: version + 1,
    });
  }

  static createPersist(attrs: PersistCustomerEntity): CustomerEntity {
    const {
      id,
      name,
      gender,
      phoneNumber,
      ageGroup,
      region,
      email,
      memo,
      contractCount,
      version,
    } = attrs;

    return new CustomerEntity({
      id,
      name,
      gender,
      phoneNumber,
      ageGroup,
      region,
      email,
      memo,
      contractCount,
      version,
    });
  }

  private static checkNameRule(name: string): void {
    if (name.length > 10) {
      throw new BusinessException({
        type: BusinessExceptionType.NAME_TOO_LONG,
      });
    }
  }
}
