import {
  RegistCustomerReq,
  UpdateCustomerReq,
} from "../../1_inbound/requests/customer-schema.request";
import {
  AgeGroupLabel,
  CustomerResponseDto,
  GenderLabel,
  RegionLabel,
} from "../../1_inbound/responses/customer/customer.response";
import {
  CustomerEntity,
  NewCustomerEntity,
  PersistCustomerEntity,
  UpdateCustomerEntity,
} from "../../2_domain/entities/customer/customer.entity";
import {
  CustomerAgeGroup,
  CustomerGender,
  CustomerRegion,
} from "../../2_domain/entities/customer/customer.enum";

const GenderLabelMap: Record<CustomerGender, GenderLabel> = {
  [CustomerGender.MALE]: "남",
  [CustomerGender.FEMALE]: "여",
};

const AgeGroupLabelMap: Record<CustomerAgeGroup, AgeGroupLabel> = {
  [CustomerAgeGroup.TEN]: "10대",
  [CustomerAgeGroup.TWENTY]: "20대",
  [CustomerAgeGroup.THIRTY]: "30대",
  [CustomerAgeGroup.FOURTY]: "40대",
  [CustomerAgeGroup.FIFTY]: "50대",
  [CustomerAgeGroup.SIXTY]: "60대",
  [CustomerAgeGroup.SEVENTY]: "70대",
  [CustomerAgeGroup.EIGHTY]: "80대",
};

const RegionLabelMap: Record<CustomerRegion, RegionLabel> = {
  [CustomerRegion.SEOUL]: "서울",
  [CustomerRegion.GYEONGGI]: "경기",
  [CustomerRegion.INCHEON]: "인천",
  [CustomerRegion.GANGWON]: "강원",
  [CustomerRegion.CHUNGBUK]: "충북",
  [CustomerRegion.CHUNGNAM]: "충남",
  [CustomerRegion.SEJONG]: "세종",
  [CustomerRegion.DAEJEON]: "대전",
  [CustomerRegion.JEONBUK]: "전북",
  [CustomerRegion.JEONNAM]: "전남",
  [CustomerRegion.GWANGJU]: "광주",
  [CustomerRegion.GYEONGBUK]: "경북",
  [CustomerRegion.GYEONGNAM]: "경남",
  [CustomerRegion.DAEGU]: "대구",
  [CustomerRegion.ULSAN]: "울산",
  [CustomerRegion.BUSAN]: "부산",
  [CustomerRegion.JEJU]: "제주",
};

export interface CustomerReocrd {
  id: number;
  name: string;
  gender: CustomerGender;
  phoneNumber: string;
  ageGroup?: CustomerAgeGroup;
  region?: CustomerRegion;
  email: string;
  memo?: string;
  companyId: number;
  contractCount: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

//DTO -> Entity
export class CustomerMapper {
  static toNewEntity(params: {
    dto: RegistCustomerReq;
    companyId: number;
  }): NewCustomerEntity {
    const { dto, companyId } = params;
    const customer = dto.body;

    return CustomerEntity.createNew({
      name: customer.name,
      gender: customer.gender ?? CustomerGender.MALE,
      phoneNumber: customer.phoneNumber,
      ageGroup: customer.ageGroup,
      region: customer.region,
      email: customer.email,
      memo: customer.memo,
      companyId,
    });
  }

  // CSV 용
  static toNewEntities(params: {
    row: {
      name: string;
      gender?: string;
      phoneNumber: string;
      email: string;
      ageGroup?: string;
      region?: string;
      memo?: any;
    };
    companyId: number;
  }): NewCustomerEntity {
    const { row, companyId } = params;

    return CustomerEntity.createNew({
      name: row.name,
      gender: (row.gender as CustomerGender) ?? CustomerGender.MALE,
      phoneNumber: row.phoneNumber,
      ageGroup: row.ageGroup as CustomerAgeGroup | undefined,
      region: row.region as CustomerRegion | undefined,
      email: row.email,
      memo: row.memo,
      companyId,
    });
  }

  static toUpdateEntity(
    currentEntity: PersistCustomerEntity,
    dto: UpdateCustomerReq,
  ): UpdateCustomerEntity {
    const { ...customer } = dto.body;

    return CustomerEntity.update({
      id: currentEntity.id,
      name: customer.name ?? currentEntity.name,
      gender: customer.gender
        ? (customer.gender as CustomerGender)
        : CustomerGender.MALE,
      phoneNumber: customer.phoneNumber ?? currentEntity.phoneNumber,
      ageGroup: customer.ageGroup
        ? (customer.ageGroup as CustomerAgeGroup)
        : currentEntity.ageGroup,
      region: customer.region
        ? (customer.region as CustomerRegion)
        : currentEntity.region,
      email: customer.email ?? currentEntity.email,
      memo: customer.memo ?? currentEntity.memo,
      companyId: currentEntity.companyId,
      version: currentEntity.version,
    });
  }

  //entity -> db
  static toPersistence(entity: NewCustomerEntity) {
    return {
      name: entity.name,
      gender: entity.gender,
      phoneNumber: entity.phoneNumber,
      ageGroup: entity.ageGroup,
      region: entity.region,
      email: entity.email,
      memo: entity.memo,
      companyId: entity.companyId,
    };
  }

  //DB -> Entity
  static fromPersistence(record: any): PersistCustomerEntity {
    const domainRecord: CustomerReocrd = {
      id: record.id,
      name: record.name,
      gender: record.gender,
      phoneNumber: record.phoneNumber,
      ageGroup: record.ageGroup,
      region: record.region,
      email: record.email,
      memo: record.memo,
      contractCount: record.contractCount,
      companyId: record.companyId,
      version: record.version,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };

    return CustomerEntity.createPersist(domainRecord);
  }

  //Entity -> DTO
  static toResponseData(entity: PersistCustomerEntity): CustomerResponseDto {
    return {
      id: entity.id!,
      name: entity.name,
      gender: GenderLabelMap[entity.gender], // "남" / "여"
      phoneNumber: entity.phoneNumber,
      ageGroup: entity.ageGroup ? AgeGroupLabelMap[entity.ageGroup] : undefined,
      region: entity.region ? RegionLabelMap[entity.region] : undefined,
      email: entity.email,
      memo: entity.memo,
      contractCount: entity.contractCount,
      version: entity.version,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }
}
