"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyEntity = void 0;
const business_exception_1 = require("../../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../../4_shared/exceptions/business.exceptions/exception-info");
class CompanyEntity {
    constructor(attrs) {
        this._id = attrs.id;
        this._companyName = attrs.companyName;
        this._companyCode = attrs.companyCode;
        this._userCount = attrs.userCount;
        this._version = attrs.version ?? 1;
    }
    get id() {
        return this._id;
    }
    get companyName() {
        return this._companyName;
    }
    get companyCode() {
        return this._companyCode;
    }
    get userCount() {
        return this._userCount;
    }
    get version() {
        return this._version;
    }
    static createNewCom(params) {
        const { companyName, companyCode } = params;
        this.checkCompanyNameRule(companyName);
        this.checkCompanyCodeRule(companyCode);
        return new CompanyEntity({
            companyName,
            companyCode,
            userCount: 0,
        });
    }
    static createPersistCom(attrs) {
        const { id, companyName, companyCode, userCount, version } = attrs;
        return new CompanyEntity({
            id,
            companyName,
            companyCode,
            userCount,
            version,
        });
    }
    toCreateData() {
        return {
            companyName: this._companyName,
            companyCode: this._companyCode,
            userCount: this._userCount,
            version: this._version,
        };
    }
    toUpdateData() {
        return {
            companyName: this._companyName,
            companyCode: this._companyCode,
            userCount: this._userCount,
            version: this._version,
        };
    }
    updateInfo(params) {
        let isUpdated = false;
        if (params.companyName) {
            CompanyEntity.checkCompanyNameRule(params.companyName);
            this._companyName = params.companyName;
            isUpdated = true;
        }
        if (params.companyCode) {
            CompanyEntity.checkCompanyCodeRule(params.companyCode);
            this._companyCode = params.companyCode;
            isUpdated = true;
        }
        if (isUpdated) {
            this._version++;
        }
    }
    static checkCompanyNameRule(companyName) {
        if (companyName.length <= 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.BAD_REQUEST,
            });
        }
    }
    static checkCompanyCodeRule(companyCode) {
        if (companyCode.length <= 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.BAD_REQUEST,
            });
        }
    }
    increaseUserCount() {
        this._userCount++;
        this._version++;
    }
    decreaseUserCount() {
        if (this._userCount <= 0) {
            return;
        }
        this._userCount--;
        this._version++;
    }
}
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=company.entity.js.map