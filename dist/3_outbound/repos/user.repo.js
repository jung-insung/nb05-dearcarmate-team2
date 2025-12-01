"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const client_1 = require("@prisma/client");
const base_repo_1 = require("./base.repo");
const user_mapper_1 = require("../mappers/user.mapper");
const exception_info_1 = require("../../4_shared/exceptions/technical.exceptions/exception-info");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
class UserRepo extends base_repo_1.BaseRepo {
    constructor(prisma) {
        super(prisma);
        this._includeOption = {
            company: {
                select: {
                    id: true,
                    companyName: true,
                },
            },
        };
    }
    // 유저가 속한 회사의 직원들 불러오기용
    async findAllByCompanyId(companyId) {
        const users = await this._prisma.user.findMany({
            where: { companyId },
            include: this._includeOption,
        });
        return users.map((user) => user_mapper_1.UserMapper.toPersistEntity(user));
    }
    async findUserByEmail(email, lockType) {
        if (!lockType) {
            const foundUser = await this._prisma.user.findUnique({
                where: { email },
                include: this._includeOption,
            });
            return foundUser ? user_mapper_1.UserMapper.toPersistEntity(foundUser) : null;
        }
        let query;
        switch (lockType) {
            case "share":
                query = client_1.Prisma.sql `SELECT * FROM "User" WHERE email = ${email} FOR SHARE`;
                break;
            case "beta":
                query = client_1.Prisma.sql `SELECT * FROM "User" WHERE email = ${email} FOR UPDATE`;
                break;
            default:
                throw new Error("유효하지 않은 잠금입니다.");
        }
        const users = await this._prisma.$queryRaw(query);
        if (users.length !== 1) {
            return null;
        }
        const foundUser = await this._prisma.user.findUnique({
            where: { email },
            include: this._includeOption,
        });
        return user_mapper_1.UserMapper.toPersistEntity(foundUser);
    }
    async findUserById(id, lockType) {
        if (!lockType) {
            const foundUser = await this._prisma.user.findUnique({
                where: { id },
                include: this._includeOption,
            });
            return foundUser ? user_mapper_1.UserMapper.toPersistEntity(foundUser) : null;
        }
        let query;
        switch (lockType) {
            case "share":
                query = client_1.Prisma.sql `SELECT * FROM "User" WHERE id = ${id} FOR SHARE`;
                break;
            case "beta":
                query = client_1.Prisma.sql `SELECT * FROM "User" WHERE id = ${id} FOR UPDATE`;
                break;
            default:
                throw new Error("유효하지 않은 잠금입니다.");
        }
        const users = await this._prisma.$queryRaw(query);
        if (users.length !== 1) {
            return null;
        }
        const foundUser = await this._prisma.user.findUnique({
            where: { id },
            include: this._includeOption,
        });
        return user_mapper_1.UserMapper.toPersistEntity(foundUser);
    }
    async create(entity) {
        try {
            const newUser = await this._prisma.user.create({
                data: {
                    ...user_mapper_1.UserMapper.toCreateData(entity),
                },
                include: this._includeOption,
            });
            return user_mapper_1.UserMapper.toPersistEntity(newUser);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    const target = err.meta?.target;
                    if (target?.includes("email")) {
                        throw new technical_exception_1.TechnicalException({
                            type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL,
                            error: err,
                        });
                    }
                    throw err; // 또 다른 UNIQUE 에러 있을 시
                }
            }
            throw err;
        }
    }
    async update(entity) {
        try {
            const updatedUser = await this._prisma.user.update({
                where: {
                    id: entity.id,
                    version: entity.version,
                },
                data: {
                    ...user_mapper_1.UserMapper.toUpdateData(entity),
                    version: { increment: 1 },
                },
                include: this._includeOption,
            });
            return user_mapper_1.UserMapper.toPersistEntity(updatedUser);
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2002") {
                    const target = err.meta?.target;
                    if (target?.includes("email")) {
                        throw new technical_exception_1.TechnicalException({
                            type: exception_info_1.TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL,
                            error: err,
                        });
                    }
                    throw err; // 또 다른 UNIQUE 에러 있을 시
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
    async delete(id) {
        try {
            await this._prisma.user.delete({
                where: { id },
            });
        }
        catch (err) {
            if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === "P2025") {
                    return; // 팬텀 리드가 일어나도 그냥 삭제되었으니까 에러 던지지 말기
                }
            }
            throw err;
        }
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=user.repo.js.map