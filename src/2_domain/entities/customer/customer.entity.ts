import { AgeGroup, Gender, Region } from "@prisma/client";
import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";

export type CustomerCreateData = {
  name: string;
  gender: Gender;
  phoneNumber: string;
  ageGroup?: AgeGroup;
  region?: Region;
  email: string;
  memo?: string;
};

export type CustomerUpdatedData = {
  name: string;
  gender: Gender;
  phoneNumber: string;
  ageGroup?: AgeGroup;
  region?: Region;
  email: string;
  memo?: string;
  version: number;
};

export type NewCustomerEntity = Omit<
  CustomerEntity,
  "id" | "createdAt" | "updatedAt" | "contractCount" | "version" | "isModified"
>;

export interface PersistCustomerEntity extends CustomerEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CustomerEntity {
  private readonly _id?: number;
  private _name: string;
  private _gender: Gender;
  private _phoneNumber: string;
  private _ageGroup?: AgeGroup;
  private _region?: Region;
  private _email: string;
  private _memo?: string;
  private _contractCount: number;
  private _version: number;
  private _isModified: boolean;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    name: string;
    gender: Gender;
    phoneNumber: string;
    ageGroup?: AgeGroup;
    region?: Region;
    email: string;
    memo?: string;
    contractCount?: number;
    version?: number;
    isModified?: boolean;
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
    this._isModified = attrs.isModified ?? false;
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
  get isModified() {
    return this._isModified;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }

  toCreateData(): CustomerCreateData {
    return {
      name: this._name,
      gender: this._gender,
      phoneNumber: this._phoneNumber,
      ageGroup: this._ageGroup,
      region: this._region,
      email: this._email,
      memo: this._memo,
    };
  }

  toUpdateData(): CustomerUpdatedData {
    return {
      name: this._name,
      gender: this._gender,
      phoneNumber: this._phoneNumber,
      ageGroup: this._ageGroup,
      region: this._region,
      email: this._email,
      memo: this._memo,
      version: this._version,
    };
  }

  static createNew(params: {
    name: string;
    gender: Gender;
    phoneNumber: string;
    ageGroup?: AgeGroup;
    region?: Region;
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
    id: number;
    name: string;
    gender: Gender;
    phoneNumber: string;
    ageGroup?: AgeGroup;
    region?: Region;
    email: string;
    memo?: string;
    version: number;
  }): CustomerEntity {
    const {
      id,
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
      id,
      name,
      gender,
      phoneNumber,
      ageGroup,
      region,
      email,
      memo,
      version: version + 1,
      isModified: true,
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
      isModified,
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
      isModified,
    });
  }
  private static checkNameRule(name: string): void {
    if (name.length > 10) {
      throw new BusinessException({
        type: BusinessExceptionType.NAME_TOO_LONG,
      });
    }
  }

  markUnmodified() {
    this._isModified = false;
  }
}
