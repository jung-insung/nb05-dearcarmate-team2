import {
  CustomerCreateData,
  CustomerEntity,
  CustomerUpdatedData,
  NewCustomerEntity,
  PersistCustomerEntity,
} from "../../2_domain/entities/customer/customer.entity";

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

export class CustomerMapper {
  static toCreateData(entity: NewCustomerEntity): {
    customer: CustomerCreateData;
  } {
    return {
      customer: entity.toCreateData(),
    };
  }

  static toUpdateData(entity: PersistCustomerEntity): {
    customer: CustomerUpdatedData;
  } {
    return {
      customer: entity.toUpdateData(),
    };
  }

  static toPersistEntity(record: PersistCustomerEntity): CustomerEntity {
    return CustomerEntity.createPersist(record);
  }
}
