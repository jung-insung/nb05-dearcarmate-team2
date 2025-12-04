"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const exception_info_2 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const user_entity_1 = require("../entities/user/user.entity");
const base_service_1 = require("./base.service");
class UserService extends base_service_1.BaseService {
    constructor(unitOfWork, _bcryptHashManager) {
        super(unitOfWork);
        this._bcryptHashManager = _bcryptHashManager;
    }
    async signUpUser(dto) {
        const { body } = dto;
        return await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserByEmail(body.email);
            if (foundUser) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.EMAIL_DUPLICATE,
                });
            }
            if (body.password !== body.passwordConfirmation) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.SIGNUP_PASSWORD_MISMATCH,
                });
            }
            const { name, email, employeeNumber, phoneNumber, password } = body;
            if (!body.companyCode && !body.companyName) {
                //관리자 계정
                const newUser = await user_entity_1.UserEntity.createAdmin({
                    name,
                    email,
                    employeeNumber,
                    phoneNumber,
                    password,
                    bcryptHashManager: this._bcryptHashManager,
                });
                try {
                    return await repos.user.create(newUser);
                }
                catch (err) {
                    if (err instanceof technical_exception_1.TechnicalException) {
                        if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL)
                            throw new business_exception_1.BusinessException({
                                type: exception_info_1.BusinessExceptionType.EMAIL_DUPLICATE,
                            });
                    }
                    throw err;
                }
            }
            else {
                // 일반 유저
                const foundCompany = await repos.company.findCompanyByCompanyCode(body.companyCode);
                if (!foundCompany) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_1.BusinessExceptionType.COMPANY_NOT_EXIST,
                    });
                }
                const newUser = await user_entity_1.UserEntity.createUser({
                    name,
                    email,
                    employeeNumber,
                    phoneNumber,
                    password,
                    bcryptHashManager: this._bcryptHashManager,
                    companyId: foundCompany.id,
                });
                foundCompany.increaseUserCount();
                try {
                    await repos.company.updateCompany(foundCompany);
                    return await repos.user.create(newUser);
                }
                catch (err) {
                    if (err instanceof technical_exception_1.TechnicalException) {
                        if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL)
                            throw new business_exception_1.BusinessException({
                                type: exception_info_1.BusinessExceptionType.EMAIL_DUPLICATE,
                            });
                    }
                    throw err;
                }
            }
        });
    }
    async updateUser(dto) {
        const { body } = dto;
        return await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(dto.userId);
            if (!foundUser) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
                });
            }
            if (!(await foundUser.isPasswordMatch(body.currentPassword, this._bcryptHashManager))) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.PASSWORD_MISMATCH,
                });
            }
            let updatedPassword;
            if (body.password && body.passwordConfirmation) {
                if (body.password !== body.passwordConfirmation) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_1.BusinessExceptionType.PASSWORD_MISMATCH,
                    });
                }
                updatedPassword = await foundUser.updatePassword(body.password, this._bcryptHashManager);
            }
            const updatedUser = user_entity_1.UserEntity.updateUser({
                id: dto.userId,
                name: foundUser.name,
                email: foundUser.email,
                employeeNumber: body.employeeNumber,
                phoneNumber: body.phoneNumber,
                password: updatedPassword ?? foundUser.password,
                imageUrl: body.imageUrl,
                isAdmin: foundUser.isAdmin,
                version: foundUser.version,
            });
            return await repos.user.update(updatedUser);
        });
    }
    async getUser(dto) {
        const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);
        if (!foundUser) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
            });
        }
        return foundUser;
    }
    async deleteUser(dto) {
        await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(dto.params.userId);
            if (!foundUser) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
                });
            }
            const foundAdmin = await repos.user.findUserById(dto.userId);
            if (!foundAdmin?.isAdmin) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.NOT_ADMIN,
                });
            }
            const foundCompany = await repos.company.findById(foundUser.companyId);
            if (foundCompany) {
                foundCompany.decreaseUserCount();
                await repos.company.updateCompany(foundCompany);
            }
            await repos.user.delete(foundUser.id);
        });
    }
    async checkUserExists(userId) {
        const foundUser = await this._unitOfWork.repos.user.findUserById(userId);
        if (!foundUser) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
            });
        }
        return true;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map