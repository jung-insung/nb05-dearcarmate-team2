"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const customer_mapper_1 = require("../../3_outbound/mappers/customer.mapper");
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const exception_info_2 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const customer_csv_util_1 = require("../../4_shared/utils/customer-csv.util");
const base_service_1 = require("./base.service");
class CustomerService extends base_service_1.BaseService {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    async registCustomer(params) {
        try {
            const { dto, userId } = params;
            const companyId = await this._getCompanyId(userId);
            const entity = customer_mapper_1.CustomerMapper.toNewEntity({ dto, companyId });
            const newCusotmer = await this._unitOfWork.repos.customer.create(entity);
            return customer_mapper_1.CustomerMapper.toResponseData(newCusotmer);
        }
        catch (err) {
            if (err instanceof technical_exception_1.TechnicalException) {
                if (err.type === exception_info_2.TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_1.BusinessExceptionType.ALREADY_EXIST_EAMIL,
                    });
                }
            }
            throw err;
        }
    }
    async getCustomers(params) {
        const { userId, page, pageSize, searchBy, keyword } = params;
        const companyId = await this._getCompanyId(userId);
        const { data, totalItemCount } = await this._unitOfWork.repos.customer.findAll({
            companyId,
            page,
            pageSize,
            searchBy,
            keyword,
        });
        const resData = data.map(customer_mapper_1.CustomerMapper.toResponseData);
        return {
            currentPage: page,
            totalPages: Math.ceil(totalItemCount / pageSize),
            totalItemCount,
            data: resData,
        };
    }
    async getCustomer(customerId) {
        const customer = await this._unitOfWork.repos.customer.findById(customerId);
        if (!customer) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CUSTOMER_NOT_EXIST,
            });
        }
        return customer_mapper_1.CustomerMapper.toResponseData(customer);
    }
    async updateCustomer(params) {
        const { customerId, dto } = params;
        return await this._unitOfWork.do(async (txRepos) => {
            const customer = await txRepos.customer.findById(customerId);
            if (!customer) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.CUSTOMER_NOT_EXIST,
                });
            }
            const entity = customer_mapper_1.CustomerMapper.toUpdateEntity(customer, dto);
            try {
                const updatedCustomer = await txRepos.customer.update(customerId, entity);
                return customer_mapper_1.CustomerMapper.toResponseData(updatedCustomer);
            }
            catch (err) {
                if (err instanceof technical_exception_1.TechnicalException) {
                    if (err.type === exception_info_2.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
                        throw new business_exception_1.BusinessException({
                            type: exception_info_1.BusinessExceptionType.CUSTOMER_DATA_CHANGED,
                        });
                    }
                }
                throw err;
            }
        });
    }
    async deleteCustomer(customerId) {
        try {
            await this._unitOfWork.repos.customer.delete(customerId);
        }
        catch (err) {
            if (err instanceof technical_exception_1.TechnicalException) {
                if (err.type === exception_info_2.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_1.BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE,
                    });
                }
            }
        }
    }
    async uploadCustomers(params) {
        const { userId, req } = params;
        const companyId = await this._getCompanyId(userId);
        const file = req.file;
        if (!file) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CUSTOMER_FILE_NOT_UPLOAD,
            });
        }
        const content = file.buffer?.toString("utf-8");
        if (!content) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CUSTOMER_UPLOAD_FILE_EMPTY,
            });
        }
        const rows = customer_csv_util_1.CustomerCSVUtil.parse(content);
        if (rows.length === 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CUSTOMER_FILE_DATAFORM_INCOREECT,
            });
        }
        await this._unitOfWork.do(async (txRepos) => {
            for (const row of rows) {
                const entity = customer_mapper_1.CustomerMapper.toNewEntities({
                    row: row.body,
                    companyId,
                });
                await txRepos.customer.create(entity);
            }
        }, false);
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map