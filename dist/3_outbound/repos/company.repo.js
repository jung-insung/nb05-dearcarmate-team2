"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRepo = void 0;
const client_1 = require("@prisma/client");
const base_repo_1 = require("./base.repo");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_1 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const company_mapper_1 = require("../mappers/company.mapper");
const user_mapper_1 = require("../mappers/user.mapper");
class CompanyRepo extends base_repo_1.BaseRepo {
    constructor(prisma) {
        super(prisma);
    }
    async findById(companyId, lockType) {
        if (!lockType) {
            const record = await this._prisma.company.findUnique({
                where: { id: companyId },
            });
            if (!record) {
                return null;
            }
            return company_mapper_1.CompanyMapper.toPersistEntity(record);
        }
        let query;
        switch (lockType) {
            case "share":
                query = client_1.Prisma.sql `SELECT * FROM "Company" WHERE id = ${companyId} FOR SHARE`;
                break;
            case "beta":
                query = client_1.Prisma.sql `SELECT * FROM "Company" WHERE id = ${companyId} FOR UPDATE`;
                break;
            default:
                throw new Error("유효하지 않은 잠금 타입입니다.");
        }
        const records = await this._prisma.$queryRaw(query);
        const record = records[0];
        if (!record) {
            return null;
        }
        return company_mapper_1.CompanyMapper.toPersistEntity(record);
    }
    async findCompanyByCompanyCode(companyCode) {
        const foundCompany = await this._prisma.company.findUnique({
            where: { companyCode },
        });
        return foundCompany ? company_mapper_1.CompanyMapper.toPersistEntity(foundCompany) : null;
    }
    async findCompanies(query) {
        try {
            const { offset, limit, keyword, searchBy } = query;
            const queryMode = "insensitive";
            let whereCondition = {};
            if (keyword) {
                switch (searchBy) {
                    case "companyCode":
                        whereCondition = {
                            companyCode: { contains: keyword, mode: queryMode },
                        };
                        break;
                    default:
                        whereCondition = {
                            companyName: { contains: keyword, mode: queryMode },
                        };
                }
            }
            const totalItemCount = await this._prisma.company.count({
                where: whereCondition,
            });
            const records = await this._prisma.company.findMany({
                skip: offset,
                take: limit,
                where: whereCondition,
                orderBy: {
                    createdAt: "asc",
                },
            });
            const companies = records.map((record) => company_mapper_1.CompanyMapper.toPersistEntity(record));
            return { companies, totalItemCount };
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
    async findUsers(query) {
        try {
            const { offset, limit, keyword, searchBy } = query;
            const queryMode = "insensitive";
            let whereCondition = {};
            if (keyword) {
                switch (searchBy) {
                    case "name":
                        whereCondition = { name: { contains: keyword, mode: queryMode } };
                        break;
                    case "email":
                        whereCondition = { email: { contains: keyword, mode: queryMode } };
                        break;
                    default:
                        whereCondition = {
                            company: { companyName: { contains: keyword, mode: queryMode } },
                        };
                }
            }
            const totalItemCount = await this._prisma.user.count({
                where: whereCondition,
            });
            const records = await this._prisma.user.findMany({
                skip: offset,
                take: limit,
                where: whereCondition,
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    company: true,
                },
            });
            const users = records.map((record) => user_mapper_1.UserMapper.toPersistEntity(record));
            return { users, totalItemCount };
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
    async createCompany(entity) {
        try {
            const createData = company_mapper_1.CompanyMapper.toCreateData(entity);
            const newRecord = await this._prisma.company.create({
                data: createData.company,
            });
            return company_mapper_1.CompanyMapper.toPersistEntity(newRecord);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    const target = err.meta?.target;
                    if (target?.includes("companyName")) {
                        throw new technical_exception_1.TechnicalException({
                            type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME,
                            error: err,
                        });
                    }
                    if (target?.includes("companyCode")) {
                        throw new technical_exception_1.TechnicalException({
                            type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE,
                            error: err,
                        });
                    }
                    throw err;
                }
            }
            throw err;
        }
    }
    async updateCompany(entity) {
        try {
            const updateData = company_mapper_1.CompanyMapper.toUpdateData(entity);
            const updatedRecord = await this._prisma.company.update({
                where: {
                    id: entity.id,
                    version: entity.version - 1,
                },
                data: updateData.company,
            });
            return company_mapper_1.CompanyMapper.toPersistEntity(updatedRecord);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    const target = err.meta?.target;
                    if (target?.includes("companyName")) {
                        throw new technical_exception_1.TechnicalException({
                            type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME,
                            error: err,
                        });
                    }
                    if (target?.includes("companyCode")) {
                        throw new technical_exception_1.TechnicalException({
                            type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE,
                            error: err,
                        });
                    }
                    throw err;
                }
                else if (err.code === "P2025") {
                    throw new technical_exception_1.TechnicalException({
                        type: exception_info_1.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
                        error: err,
                    });
                }
            }
            throw err;
        }
    }
    async deleteCompany(companyId) {
        try {
            await this._prisma.company.delete({
                where: { id: companyId },
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
}
exports.CompanyRepo = CompanyRepo;
//# sourceMappingURL=company.repo.js.map