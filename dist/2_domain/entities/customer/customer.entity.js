"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerEntity = void 0;
const business_exception_1 = require("../../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../../4_shared/exceptions/business.exceptions/exception-info");
class CustomerEntity {
    constructor(attrs) {
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
        this._companyId = attrs.companyId;
        this._createdAt = attrs.createdAt;
        this._updatedAt = attrs.updatedAt;
    }
    get id() {
        return this._id;
    }
    get companyId() {
        return this._companyId;
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
    static createNew(params) {
        const { name, gender, phoneNumber, ageGroup, region, email, memo, companyId, } = params;
        this.checkNameRule(name);
        return new CustomerEntity({
            name,
            gender,
            phoneNumber,
            ageGroup,
            region,
            email,
            memo,
            companyId,
        });
    }
    static update(params) {
        const { id, name, gender, phoneNumber, ageGroup, region, email, memo, companyId, version, } = params;
        const entity = new CustomerEntity({
            id,
            name,
            gender,
            phoneNumber,
            ageGroup,
            region,
            email,
            memo,
            companyId,
            version: version,
        });
        return entity;
    }
    static createPersist(record) {
        const { id, name, gender, phoneNumber, ageGroup, region, email, memo, contractCount, companyId, version, } = record;
        const entity = new CustomerEntity({
            id,
            name,
            gender,
            phoneNumber,
            ageGroup,
            region,
            email,
            memo,
            contractCount,
            companyId,
            version,
        });
        return entity;
    }
    static checkNameRule(name) {
        if (name.length > 10) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.NAME_TOO_LONG,
            });
        }
    }
}
exports.CustomerEntity = CustomerEntity;
//# sourceMappingURL=customer.entity.js.map