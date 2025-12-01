"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRepo = void 0;
const client_1 = require("@prisma/client");
const car_entity_1 = require("../../2_domain/entities/car/car.entity");
const base_repo_1 = require("./base.repo");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_1 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
class CarRepo extends base_repo_1.BaseRepo {
    constructor(prisma) {
        super(prisma);
    }
    async create(entity) {
        const data = entity.toCreateData();
        const record = await this._prisma.car.create({
            data,
        });
        return car_entity_1.CarEntity.fromPersistence(record);
    }
    async findById(params) {
        const record = await this._prisma.car.findFirst({
            where: {
                id: params.carId,
                companyId: params.companyId,
            },
        });
        return record ? car_entity_1.CarEntity.fromPersistence(record) : null;
    }
    async findMany(params) {
        const { companyId, page, pageSize, status, searchBy, keyword } = params;
        const where = { companyId };
        if (status) {
            where.status = status;
        }
        if (keyword && searchBy) {
            where[searchBy] = {
                contains: keyword,
                mode: "insensitive",
            };
        }
        const [records, totalItemCount] = await Promise.all([
            this._prisma.car.findMany({
                where,
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { createdAt: "desc" },
            }),
            this._prisma.car.count({ where }),
        ]);
        return {
            items: records.map((r) => car_entity_1.CarEntity.fromPersistence(r)),
            totalItemCount,
        };
    }
    async findByCarNumber(carNumber, companyId) {
        const record = await this._prisma.car.findFirst({
            where: { carNumber, companyId },
        });
        return record ? car_entity_1.CarEntity.fromPersistence(record) : null;
    }
    async update(entity) {
        const data = entity.toUpdateData();
        const { version, ...rest } = data;
        const previousVersion = version - 1;
        try {
            const record = await this._prisma.car.update({
                where: { id: entity.id, version: previousVersion },
                data: {
                    ...rest,
                    version: { increment: 1 },
                },
            });
            return car_entity_1.CarEntity.fromPersistence(record);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                err.code === "P2025") {
                throw new technical_exception_1.TechnicalException({
                    type: exception_info_1.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
                    error: err,
                });
            }
            throw err;
        }
    }
    async delete(params) {
        await this._prisma.car.deleteMany({
            where: {
                id: params.carId,
                companyId: params.companyId,
            },
        });
    }
}
exports.CarRepo = CarRepo;
//# sourceMappingURL=car.repo.js.map