"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRepo = void 0;
const client_1 = require("@prisma/client");
const base_repo_1 = require("./base.repo");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_1 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const contract_mapper_1 = require("../mappers/contract.mapper");
const contract_enum_1 = require("../../2_domain/entities/contract/contract.enum");
const contract_doc_mapper_1 = require("../mappers/contract-doc.mapper");
class ContractRepo extends base_repo_1.BaseRepo {
    constructor(prisma) {
        super(prisma);
        this._includeOption = {
            user: { select: { id: true, name: true, email: true } },
            customer: { select: { id: true, name: true, email: true } },
            car: { select: { id: true, model: true, carNumber: true } },
            meeting: true,
            documents: true,
        };
        this._includeOptionForDoc = {
            user: true,
            car: true,
            customer: true,
            documents: true,
        };
    }
    _toPrismaStatus(status) {
        switch (status) {
            case contract_enum_1.ContractStatus.CAR_INSPECTION:
                return client_1.ContractStatus.CAR_INSPECTION;
            case contract_enum_1.ContractStatus.PRICE_NEGOTIATION:
                return client_1.ContractStatus.PRICE_NEGOTIATION;
            case contract_enum_1.ContractStatus.CONTRACT_DRAFT:
                return client_1.ContractStatus.CONTRACT_DRAFT;
            case contract_enum_1.ContractStatus.CONTRACT_SUCCESSFUL:
                return client_1.ContractStatus.CONTRACT_SUCCESSFUL;
            case contract_enum_1.ContractStatus.CONTRACT_FAILED:
                return client_1.ContractStatus.CONTRACT_FAILED;
            default:
                return client_1.ContractStatus.CAR_INSPECTION;
        }
    }
    async findById(id) {
        const record = await this._prisma.contract.findUnique({
            where: { id },
        });
        return contract_mapper_1.ContractMapper.toPersistEntity(record);
    }
    async update(id, entity) {
        try {
            const { contract, meeting, contractDocuments } = contract_mapper_1.ContractMapper.toUpdateData(entity);
            const data = {
                ...contract,
                status: contract.status != null
                    ? this._toPrismaStatus(contract.status)
                    : undefined,
                version: { increment: 1 },
            };
            if (meeting) {
                data.meeting = meeting;
            }
            if (contractDocuments) {
                data.documents = {
                    set: [],
                    connect: contractDocuments.map(d => ({ id: d.id }))
                };
            }
            const record = await this._prisma.contract.update({
                where: {
                    id,
                    version: contract.version,
                },
                data,
                include: this._includeOption,
            });
            return contract_mapper_1.ContractMapper.toPersistEntity(record);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    throw new technical_exception_1.TechnicalException({
                        type: exception_info_1.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
                        error: err,
                    });
                }
            }
            throw err;
        }
    }
    async findAll(query) {
        try {
            const { offset, limit, keyword, searchBy, companyId, status } = query;
            const queryMode = "insensitive";
            const where = { companyId };
            if (status) {
                where.status = this._toPrismaStatus(status);
            }
            if (keyword) {
                switch (searchBy) {
                    case "customerName":
                        where.customer = { name: { contains: keyword, mode: queryMode } };
                        break;
                    case "userName":
                        where.user = { name: { contains: keyword, mode: queryMode } };
                        break;
                    default:
                        where.OR = [
                            { customer: { name: { contains: keyword, mode: queryMode } } },
                            { user: { name: { contains: keyword, mode: queryMode } } },
                        ];
                        break;
                }
            }
            const totalItemCount = await this._prisma.contract.count({ where });
            const records = await this._prisma.contract.findMany({
                where,
                skip: offset,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: this._includeOption,
            });
            return {
                contracts: records.map((r) => contract_mapper_1.ContractMapper.toPersistEntity(r)),
                totalItemCount,
            };
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    throw new technical_exception_1.TechnicalException({
                        type: exception_info_1.TechnicalExceptionType.UNKNOWN_SERVER_ERROR,
                        error: err,
                    });
                }
            }
            throw err;
        }
    }
    async getContractsForDocView(pagination) {
        let whereCondition = {
            status: "CONTRACT_SUCCESSFUL",
            documents: {
                some: {},
            },
        };
        switch (pagination.searchBy) {
            case "userName":
                whereCondition.user = { name: { contains: pagination.keyword } };
                break;
            case "carNumber":
                whereCondition.car = { carNumber: { contains: pagination.keyword } };
                break;
            case "contractName":
                whereCondition.OR = [
                    { car: { model: { contains: pagination.keyword } } },
                    { customer: { name: { contains: pagination.keyword } } },
                ];
                break;
        }
        const contracts = await this._prisma.contract.findMany({
            where: whereCondition,
            include: this._includeOptionForDoc,
            skip: (pagination.page - 1) * pagination.pageSize,
            take: pagination.pageSize,
            orderBy: { createdAt: "desc" },
        });
        const totalItemCount = await this._prisma.contract.count({
            where: whereCondition,
        });
        ;
        const totalPages = Math.ceil(totalItemCount / pagination.pageSize);
        return {
            pagination: {
                currentPage: pagination.page,
                totalItemCount,
                totalPages,
            },
            data: contracts.map((contract) => contract_doc_mapper_1.ContractDocMapper.toContractDocViewEntity(contract)),
        };
    }
    async create(entity) {
        const { contract, meetings } = contract_mapper_1.ContractMapper.toCreateData(entity);
        const record = await this._prisma.contract.create({
            data: {
                ...contract,
                status: this._toPrismaStatus(contract.status),
                meeting: {
                    create: meetings.map((m) => ({
                        date: m.date,
                        alarms: m.alarms,
                    })),
                },
            },
            include: this._includeOption,
        });
        return contract_mapper_1.ContractMapper.toPersistEntity(record);
    }
    async getDraftContracts() {
        const contracts = await this._prisma.contract.findMany({
            where: {
                status: "CONTRACT_SUCCESSFUL",
                documents: {
                    none: {},
                },
            },
            include: this._includeOptionForDoc,
        });
        return contracts.map((contract) => contract_doc_mapper_1.ContractDocMapper.toContractDocViewEntity(contract));
    }
    async delete(id) {
        try {
            await this._prisma.contract.delete({
                where: { id },
            });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    return;
                }
            }
            throw err;
        }
    }
    async getMonthlySalesAggregates(companyId, month) {
        const now = new Date();
        let startOfMonth;
        let endOfMonth;
        if (month === "current") {
            startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 이번 달 1일
            endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // 이번 달 마지막 날
        }
        else {
            startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endOfMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        }
        const result = await this._prisma.contract.aggregate({
            _sum: { contractPrice: true },
            where: {
                companyId,
                status: "CONTRACT_SUCCESSFUL",
                resolutionDate: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                },
            },
        });
        return result._sum.contractPrice ?? 0;
    }
    async getSuccessfulContractAggregates(companyId) {
        const successContracts = await this._prisma.contract.count({
            where: {
                companyId,
                status: "CONTRACT_SUCCESSFUL",
            },
        });
        const carTypeResult = await this._prisma.$queryRaw `
      SELECT
        c2.type AS type,
        COUNT(*) AS count,
        SUM(c."contractPrice") AS "totalSales"
      FROM "Contract" AS c
      JOIN "Car" AS c2 ON c."carId" = c2.id
      WHERE c.status = 'contractSuccessful'
        AND c."companyId" = ${companyId}
      GROUP BY c2.type;
    `;
        return {
            completedContractsCount: successContracts,
            carTypeAggregates: carTypeResult,
        };
    }
    async getProceedingContractAggregate(companyId) {
        const proceedingContracts = await this._prisma.contract.count({
            where: {
                companyId,
                status: {
                    in: ["CAR_INSPECTION", "CONTRACT_DRAFT", "PRICE_NEGOTIATION"],
                },
            },
        });
        return proceedingContracts;
    }
}
exports.ContractRepo = ContractRepo;
//# sourceMappingURL=contract.repo.js.map