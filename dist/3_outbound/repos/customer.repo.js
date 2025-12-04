"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRepo = void 0;
const client_1 = require("@prisma/client");
const customer_mapper_1 = require("../mappers/customer.mapper");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_1 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const base_repo_1 = require("./base.repo");
class CustomerRepo extends base_repo_1.BaseRepo {
    constructor(prisma) {
        super(prisma);
    }
    async findById(id) {
        const record = await this._prisma.customer.findUnique({
            where: { id },
        });
        return record ? customer_mapper_1.CustomerMapper.fromPersistence(record) : null;
    }
    async findAll(params) {
        const { companyId, page, pageSize, searchBy, keyword } = params;
        const where = { companyId };
        if (keyword && searchBy) {
            where[searchBy] = { contains: keyword };
        }
        const [records, totalItemCount] = await Promise.all([
            this._prisma.customer.findMany({
                where,
                skip: (page > 0 ? page - 1 : 0) * pageSize,
                take: pageSize,
                orderBy: { createdAt: "desc" },
            }),
            this._prisma.customer.count({ where }),
        ]);
        return {
            totalItemCount,
            data: records.map((record) => customer_mapper_1.CustomerMapper.fromPersistence(record)),
        };
    }
    async create(entity) {
        try {
            const data = customer_mapper_1.CustomerMapper.toPersistence(entity);
            const newRecord = await this._prisma.customer.create({ data });
            return customer_mapper_1.CustomerMapper.fromPersistence(newRecord);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    throw new technical_exception_1.TechnicalException({
                        type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL,
                        error: err,
                    });
                }
            }
            throw err;
        }
    }
    async update(id, entity) {
        try {
            const data = customer_mapper_1.CustomerMapper.toPersistence(entity);
            const updateRecord = await this._prisma.customer.update({
                where: { id, version: entity.version },
                data: {
                    ...data,
                    version: { increment: 1 },
                },
            });
            return customer_mapper_1.CustomerMapper.fromPersistence(updateRecord);
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
    async delete(id) {
        try {
            await this._prisma.customer.delete({
                where: { id },
            });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    throw new technical_exception_1.TechnicalException({
                        type: exception_info_1.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
                        error: err,
                    });
                }
                throw err;
            }
        }
    }
    async increaseContractCount(id) {
        await this._prisma.customer.update({
            where: { id },
            data: {
                contractCount: { increment: 1 },
            },
        });
    }
    async decreaseContractCount(customerId) {
        await this._prisma.customer.updateMany({
            where: {
                id: customerId,
                contractCount: { gt: 0 },
            },
            data: {
                contractCount: { decrement: 1 },
            },
        });
    }
}
exports.CustomerRepo = CustomerRepo;
//# sourceMappingURL=customer.repo.js.map