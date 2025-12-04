"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractService = void 0;
const contract_enum_1 = require("../entities/contract/contract.enum");
const contract_mapper_1 = require("../../3_outbound/mappers/contract.mapper");
const base_service_1 = require("./base.service");
const contract_response_1 = require("../../1_inbound/responses/contract/contract.response");
const contract_entity_1 = require("../entities/contract/contract.entity");
const car_entity_1 = require("../entities/car/car.entity");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_1 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_2 = require("../../4_shared/exceptions/business.exceptions/exception-info");
class ContractService extends base_service_1.BaseService {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    async updateContract(params) {
        console.log("[updateContract] called", {
            userId: params.userId,
            contractId: params.contractId,
            body: params.dto.body,
        });
        return await this._unitOfWork.do(async (txRepos) => {
            const entity = await txRepos.contract.findById(params.contractId);
            if (!entity) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.CONTRACT_NOT_EXIST,
                });
            }
            if (entity.userId !== params.userId) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.CONTRACT_NO_AUTHORITY,
                });
            }
            const { status: statusKey, ...restBody } = params.dto.body;
            const statusEnum = statusKey
                ? contract_enum_1.ContractStatus[statusKey]
                : undefined;
            entity.update({
                ...restBody,
                status: statusEnum,
            });
            if (statusEnum) {
                const car = await txRepos.car.findById({
                    companyId: entity.companyId,
                    carId: entity.carId,
                });
                if (!car) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_2.BusinessExceptionType.CAR_NOT_EXIST,
                    });
                }
                const customer = await txRepos.customer.findById(entity.customerId);
                if (!customer) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_2.BusinessExceptionType.CUSTOMER_NOT_EXIST,
                    });
                }
                let updatedCar;
                switch (statusEnum) {
                    case contract_enum_1.ContractStatus.CONTRACT_SUCCESSFUL:
                        updatedCar = car_entity_1.CarEntity.update(car, {
                            status: "CONTRACT_COMPLETED",
                        });
                        await txRepos.customer.increaseContractCount(customer.id);
                        break;
                    case contract_enum_1.ContractStatus.CONTRACT_FAILED:
                        updatedCar = car_entity_1.CarEntity.update(car, {
                            status: "POSSESSION",
                        });
                        await txRepos.customer.decreaseContractCount(customer.id);
                        break;
                    default:
                        updatedCar = car_entity_1.CarEntity.update(car, {
                            status: "CONTRACT_PROCEEDING",
                        });
                        break;
                }
                await txRepos.car.update(updatedCar);
            }
            try {
                const updated = await txRepos.contract.update(params.contractId, entity);
                return new contract_response_1.ContractResponseDto(contract_mapper_1.ContractMapper.toResponse(updated));
            }
            catch (err) {
                if (err instanceof technical_exception_1.TechnicalException &&
                    err.type === exception_info_1.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
                    throw new business_exception_1.BusinessException({
                        type: exception_info_2.BusinessExceptionType.CONTRACT_DATA_CHANGED,
                    });
                }
                throw err;
            }
        }, true, {
            useTransaction: true,
            isolationLevel: "ReadCommitted"
        });
    }
    async getContractLists(userId, query) {
        const companyId = await this._getCompanyId(userId);
        const { page, pageSize, keyword, searchBy } = query;
        const allStatuses = Object.values(contract_enum_1.ContractStatus);
        const response = {};
        for (const status of allStatuses) {
            const { contracts, totalItemCount } = await this._unitOfWork.repos.contract.findAll({
                offset: (page - 1) * pageSize,
                limit: pageSize,
                keyword,
                searchBy,
                companyId,
                status,
            });
            response[status] = {
                totalItemCount,
                data: contracts.map((c) => new contract_response_1.ContractResponseDto(contract_mapper_1.ContractMapper.toResponse(c))),
            };
        }
        return response;
    }
    async getContractCars(userId) {
        const companyId = await this._getCompanyId(userId);
        const { items } = await this._unitOfWork.repos.car.findMany({
            companyId,
            page: 1,
            pageSize: 1000,
            status: "POSSESSION",
        });
        return items.map((car) => ({
            id: car.id,
            data: `${car.model}(${car.carNumber})`,
        }));
    }
    async getContractCustomers(userId) {
        const companyId = await this._getCompanyId(userId);
        const { data } = await this._unitOfWork.repos.customer.findAll({
            companyId,
            page: 1,
            pageSize: 1000,
        });
        return data.map((customer) => ({
            id: customer.id,
            data: `${customer.name}(${customer.email})`,
        }));
    }
    async getContractUsers(userId) {
        const companyId = await this._getCompanyId(userId);
        const users = await this._unitOfWork.repos.user.findAllByCompanyId(companyId);
        return users.map((user) => ({
            id: user.id,
            data: `${user.name}(${user.email})`,
        }));
    }
    async createContract(params) {
        const { userId, dto } = params;
        if (!dto.meetings || dto.meetings.length === 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_2.BusinessExceptionType.BAD_REQUEST,
                message: "일정을 선택해주세요",
            });
        }
        return this._unitOfWork.do(async (txRepos) => {
            // 유저 확인
            const user = await txRepos.user.findUserById(userId);
            if (!user) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.USER_NOT_EXIST,
                });
            }
            const companyId = user.companyId;
            // 차량 확인
            const car = await txRepos.car.findById({
                companyId,
                carId: dto.carId,
            });
            if (!car) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.CAR_NOT_EXIST,
                });
            }
            if (car.status !== "POSSESSION") {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.BAD_REQUEST,
                });
            }
            // 고객 확인
            const customer = await txRepos.customer.findById(dto.customerId);
            if (!customer) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.CUSTOMER_NOT_EXIST,
                });
            }
            const firstMeetingDate = new Date(dto.meetings[0].date);
            const resolutionDate = new Date(firstMeetingDate.getFullYear(), firstMeetingDate.getMonth(), firstMeetingDate.getDate(), 9, 0, 0, 0);
            const newContract = contract_entity_1.ContractEntity.createNew({
                userId,
                carId: dto.carId,
                customerId: dto.customerId,
                companyId,
                contractPrice: car.price,
                resolutionDate,
                meetings: dto.meetings,
            });
            const created = await txRepos.contract.create(newContract);
            const updatedCar = car_entity_1.CarEntity.update(car, {
                status: "CONTRACT_PROCEEDING",
            });
            await txRepos.car.update(updatedCar);
            return contract_mapper_1.ContractMapper.toCreateResponse(created, {
                user: { id: user.id, name: user.name },
                customer: { id: customer.id, name: customer.name },
                car: { id: car.id, model: car.model },
            });
        }, true, {
            useTransaction: true,
            isolationLevel: "ReadCommitted"
        });
    }
    async deleteContract(params) {
        const { userId, contractId } = params;
        await this._unitOfWork.do(async (repos) => {
            const contract = await repos.contract.findById(contractId);
            if (!contract) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.CONTRACT_NOT_EXIST,
                });
            }
            const userCompanyId = await this._getCompanyId(userId);
            if (contract.companyId !== userCompanyId) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_2.BusinessExceptionType.NOT_FOUND,
                });
            }
            const car = await repos.car.findById({
                companyId: contract.companyId,
                carId: contract.carId,
            });
            if (car) {
                const updatedCar = car_entity_1.CarEntity.update(car, {
                    status: "POSSESSION",
                });
                await repos.car.update(updatedCar);
            }
            await repos.contract.delete(contractId);
        }, true, {
            useTransaction: true,
            isolationLevel: "ReadCommitted"
        });
    }
}
exports.ContractService = ContractService;
//# sourceMappingURL=contract.service.js.map