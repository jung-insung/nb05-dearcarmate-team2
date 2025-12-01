"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerMapper = void 0;
const customer_entity_1 = require("../../2_domain/entities/customer/customer.entity");
const customer_enum_1 = require("../../2_domain/entities/customer/customer.enum");
const GenderLabelMap = {
    [customer_enum_1.CustomerGender.MALE]: "남",
    [customer_enum_1.CustomerGender.FEMALE]: "여",
};
const AgeGroupLabelMap = {
    [customer_enum_1.CustomerAgeGroup.TEN]: "10대",
    [customer_enum_1.CustomerAgeGroup.TWENTY]: "20대",
    [customer_enum_1.CustomerAgeGroup.THIRTY]: "30대",
    [customer_enum_1.CustomerAgeGroup.FOURTY]: "40대",
    [customer_enum_1.CustomerAgeGroup.FIFTY]: "50대",
    [customer_enum_1.CustomerAgeGroup.SIXTY]: "60대",
    [customer_enum_1.CustomerAgeGroup.SEVENTY]: "70대",
    [customer_enum_1.CustomerAgeGroup.EIGHTY]: "80대",
};
const RegionLabelMap = {
    [customer_enum_1.CustomerRegion.SEOUL]: "서울",
    [customer_enum_1.CustomerRegion.GYEONGGI]: "경기",
    [customer_enum_1.CustomerRegion.INCHEON]: "인천",
    [customer_enum_1.CustomerRegion.GANGWON]: "강원",
    [customer_enum_1.CustomerRegion.CHUNGBUK]: "충북",
    [customer_enum_1.CustomerRegion.CHUNGNAM]: "충남",
    [customer_enum_1.CustomerRegion.SEJONG]: "세종",
    [customer_enum_1.CustomerRegion.DAEJEON]: "대전",
    [customer_enum_1.CustomerRegion.JEONBUK]: "전북",
    [customer_enum_1.CustomerRegion.JEONNAM]: "전남",
    [customer_enum_1.CustomerRegion.GWANGJU]: "광주",
    [customer_enum_1.CustomerRegion.GYEONGBUK]: "경북",
    [customer_enum_1.CustomerRegion.GYEONGNAM]: "경남",
    [customer_enum_1.CustomerRegion.DAEGU]: "대구",
    [customer_enum_1.CustomerRegion.ULSAN]: "울산",
    [customer_enum_1.CustomerRegion.BUSAN]: "부산",
    [customer_enum_1.CustomerRegion.JEJU]: "제주",
};
//DTO -> Entity
class CustomerMapper {
    static toNewEntity(params) {
        const { dto, companyId } = params;
        const customer = dto.body;
        return customer_entity_1.CustomerEntity.createNew({
            name: customer.name,
            gender: customer.gender ?? customer_enum_1.CustomerGender.MALE,
            phoneNumber: customer.phoneNumber,
            ageGroup: customer.ageGroup,
            region: customer.region,
            email: customer.email,
            memo: customer.memo,
            companyId,
        });
    }
    // CSV 용
    static toNewEntities(params) {
        const { row, companyId } = params;
        return customer_entity_1.CustomerEntity.createNew({
            name: row.name,
            gender: row.gender ?? customer_enum_1.CustomerGender.MALE,
            phoneNumber: row.phoneNumber,
            ageGroup: row.ageGroup,
            region: row.region,
            email: row.email,
            memo: row.memo,
            companyId,
        });
    }
    static toUpdateEntity(currentEntity, dto) {
        const { ...customer } = dto.body;
        return customer_entity_1.CustomerEntity.update({
            id: currentEntity.id,
            name: customer.name ?? currentEntity.name,
            gender: customer.gender
                ? customer.gender
                : customer_enum_1.CustomerGender.MALE,
            phoneNumber: customer.phoneNumber ?? currentEntity.phoneNumber,
            ageGroup: customer.ageGroup
                ? customer.ageGroup
                : currentEntity.ageGroup,
            region: customer.region
                ? customer.region
                : currentEntity.region,
            email: customer.email ?? currentEntity.email,
            memo: customer.memo ?? currentEntity.memo,
            companyId: currentEntity.companyId,
            version: currentEntity.version,
        });
    }
    //entity -> db
    static toPersistence(entity) {
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
    static fromPersistence(record) {
        const domainRecord = {
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
        return customer_entity_1.CustomerEntity.createPersist(domainRecord);
    }
    //Entity -> DTO
    static toResponseData(entity) {
        return {
            id: entity.id,
            name: entity.name,
            gender: GenderLabelMap[entity.gender], // "남" / "여"
            phoneNumber: entity.phoneNumber,
            ageGroup: entity.ageGroup ? AgeGroupLabelMap[entity.ageGroup] : undefined,
            region: entity.region ? RegionLabelMap[entity.region] : undefined,
            email: entity.email,
            memo: entity.memo,
            contractCount: entity.contractCount,
            version: entity.version,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
}
exports.CustomerMapper = CustomerMapper;
//# sourceMappingURL=customer.mapper.js.map