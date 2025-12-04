"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const company_entity_1 = require("../entities/company/company.entity");
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_2 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const base_service_1 = require("./base.service");
class CompanyService extends base_service_1.BaseService {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    async getCompanyList(queryDto, userId) {
        return await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(userId);
            if (!foundUser?.isAdmin) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.NOT_ADMIN,
                });
            }
            const { page, pageSize, keyword, searchBy } = queryDto;
            const limit = pageSize;
            const offset = (page - 1) * pageSize;
            const { companies, totalItemCount } = await repos.company.findCompanies({
                offset,
                limit,
                keyword,
                searchBy,
            });
            const totalPages = Math.max(1, Math.ceil(totalItemCount / limit));
            const companyDtos = companies.map((entity) => {
                return {
                    id: entity.id,
                    companyName: entity.companyName,
                    companyCode: entity.companyCode,
                    userCount: entity.userCount,
                };
            });
            return {
                currentPage: page,
                totalPages: totalPages,
                totalItemCount: totalItemCount,
                data: companyDtos,
            };
        });
    }
    async getUserList(queryDto, userId) {
        return await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(userId);
            if (!foundUser?.isAdmin) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.NOT_ADMIN,
                });
            }
            const { page, pageSize, keyword, searchBy } = queryDto;
            const limit = pageSize;
            const offset = (page - 1) * pageSize;
            const { users, totalItemCount } = await repos.company.findUsers({
                offset,
                limit,
                keyword,
                searchBy,
            });
            const totalPages = Math.max(1, Math.ceil(totalItemCount / limit));
            const userDtos = users.map((entity) => {
                return {
                    id: entity.id,
                    name: entity.name,
                    email: entity.email,
                    employeeNumber: entity.employeeNumber,
                    phoneNumber: entity.phoneNumber,
                    company: {
                        companyName: entity.company.companyName,
                    },
                };
            });
            return {
                currentPage: page,
                totalPages: totalPages,
                totalItemCount: totalItemCount,
                data: userDtos,
            };
        });
    }
    async createCompany(dto, userId) {
        return await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(userId);
            if (!foundUser?.isAdmin) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.NOT_ADMIN,
                });
            }
            const newEntity = company_entity_1.CompanyEntity.createNewCom({
                companyName: dto.companyName,
                companyCode: dto.companyCode,
            });
            let createdEntity;
            try {
                createdEntity = await repos.company.createCompany(newEntity);
            }
            catch (err) {
                if (err instanceof technical_exception_1.TechnicalException) {
                    if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME) {
                        throw new business_exception_1.BusinessException({
                            type: exception_info_1.BusinessExceptionType.COMPANY_NAME_DUPLICATE,
                        });
                    }
                    if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE) {
                        throw new business_exception_1.BusinessException({
                            type: exception_info_1.BusinessExceptionType.COMPANY_CODE_DUPLICATE,
                        });
                    }
                }
                throw err;
            }
            return {
                id: createdEntity.id,
                companyName: createdEntity.companyName,
                companyCode: createdEntity.companyCode,
                userCount: createdEntity.userCount,
            };
        });
    }
    async updateCompany(companyId, dto, userId) {
        return await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(userId);
            if (!foundUser?.isAdmin) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.NOT_ADMIN,
                });
            }
            const entity = await repos.company.findById(companyId, "beta");
            if (!entity) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.COMPANY_NOT_EXIST,
                });
            }
            entity.updateInfo(dto);
            let updatedEntity;
            try {
                updatedEntity = await repos.company.updateCompany(entity);
            }
            catch (err) {
                if (err instanceof technical_exception_1.TechnicalException) {
                    if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME) {
                        throw new business_exception_1.BusinessException({
                            type: exception_info_1.BusinessExceptionType.COMPANY_NAME_DUPLICATE,
                        });
                    }
                    if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE) {
                        throw new business_exception_1.BusinessException({
                            type: exception_info_1.BusinessExceptionType.COMPANY_CODE_DUPLICATE,
                        });
                    }
                    if (err.type === exception_info_2.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
                        throw new business_exception_1.BusinessException({
                            type: exception_info_1.BusinessExceptionType.BAD_REQUEST,
                        });
                    }
                }
                throw err;
            }
            return {
                id: updatedEntity.id,
                companyName: updatedEntity.companyName,
                companyCode: updatedEntity.companyCode,
                userCount: updatedEntity.userCount,
            };
        });
    }
    async deleteCompany(companyId, userId) {
        await this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(userId);
            if (!foundUser?.isAdmin) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.NOT_ADMIN,
                });
            }
            const entity = await repos.company.findById(companyId);
            if (!entity) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.COMPANY_NOT_EXIST,
                });
            }
            await this._unitOfWork.repos.company.deleteCompany(companyId);
        });
    }
}
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map