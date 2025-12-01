"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("../../2_domain/entities/user/user.entity");
class UserMapper {
    static toCreateData(entity) {
        let companyId;
        if ("companyId" in entity) {
            companyId = entity.companyId;
        }
        const createUserData = {
            companyId,
            name: entity.name,
            email: entity.email,
            employeeNumber: entity.employeeNumber,
            phoneNumber: entity.phoneNumber,
            password: entity.password,
            isAdmin: entity.isAdmin,
            version: entity.version,
        };
        return createUserData;
    }
    static toUpdateData(entity) {
        const updateUserData = {
            employeeNumber: entity.employeeNumber,
            phoneNumber: entity.phoneNumber,
            password: entity.password,
            imageUrl: entity.imageUrl,
            refreshToken: entity.refreshToken,
        };
        return updateUserData;
    }
    static toPersistEntity(record) {
        const entity = new user_entity_1.UserEntity({
            id: record.id,
            companyId: record.companyId || undefined,
            name: record.name,
            email: record.email,
            employeeNumber: record.employeeNumber,
            phoneNumber: record.phoneNumber,
            password: record.password,
            imageUrl: record.imageUrl,
            isAdmin: record.isAdmin,
            version: record.version,
            refreshToken: record.refreshToken ?? undefined,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        });
        entity.company = record.company
            ? { companyName: record.company.companyName }
            : { companyName: "" };
        return entity;
    }
}
exports.UserMapper = UserMapper;
//# sourceMappingURL=user.mapper.js.map