"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const business_exception_1 = require("../../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../../4_shared/exceptions/business.exceptions/exception-info");
class UserEntity {
    constructor(attrs) {
        this._id = attrs.id;
        this._companyId = attrs.companyId;
        this._name = attrs.name;
        this._email = attrs.email;
        this._employeeNumber = attrs.employeeNumber;
        this._phoneNumber = attrs.phoneNumber;
        this._password = attrs.password;
        this._imageUrl = attrs.imageUrl;
        this._isAdmin = attrs.isAdmin;
        this._version = attrs.version;
        this._refreshToken = attrs.refreshToken;
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
    get email() {
        return this._email;
    }
    get employeeNumber() {
        return this._employeeNumber;
    }
    get phoneNumber() {
        return this._phoneNumber;
    }
    get password() {
        return this._password;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    get isAdmin() {
        return this._isAdmin;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    get version() {
        return this._version;
    }
    get refreshToken() {
        return this._refreshToken;
    }
    // Factory(도장 찍기)
    static async createUser(params) {
        const { name, email, employeeNumber, phoneNumber, password, companyId, bcryptHashManager, } = params;
        this.checkPasswordRule(password);
        const hashedPassword = await bcryptHashManager.hash(password);
        return new UserEntity({
            companyId,
            name,
            email,
            employeeNumber,
            phoneNumber,
            password: hashedPassword,
            isAdmin: false,
            version: 1,
        });
    }
    static async createAdmin(params) {
        const { name, email, employeeNumber, phoneNumber, password, bcryptHashManager, } = params;
        this.checkPasswordRule(password);
        const hashedPassword = await bcryptHashManager.hash(password);
        return new UserEntity({
            name,
            email,
            employeeNumber,
            phoneNumber,
            password: hashedPassword,
            isAdmin: true,
            version: 1,
        });
    }
    static updateUser(params) {
        const { id, name, email, employeeNumber, phoneNumber, password, imageUrl, version, isAdmin, } = params;
        return new UserEntity({
            id,
            name,
            email,
            employeeNumber,
            phoneNumber,
            password,
            imageUrl,
            isAdmin,
            version,
        });
    }
    // 비즈니스 규칙
    static checkPasswordRule(password) {
        if (password.length > 20) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.PASSWORD_TOO_LONG,
            });
        }
    }
    // password
    async isPasswordMatch(inputPassword, bcryptHashManager) {
        return await bcryptHashManager.compare(inputPassword, this._password);
    }
    async updatePassword(newPassword, bcryptHashManager) {
        UserEntity.checkPasswordRule(newPassword);
        return await bcryptHashManager.hash(newPassword);
    }
    // refreshToken
    async updateRefreshToken(refreshToken, bcryptHashManager) {
        this._refreshToken = await bcryptHashManager.hash(refreshToken);
    }
    async isRefreshTokenMatch(refreshToken, bcryptHashManager) {
        return await bcryptHashManager.compare(refreshToken, this.refreshToken);
    }
}
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map