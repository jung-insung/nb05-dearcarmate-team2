"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyMapper = void 0;
const company_entity_1 = require("../../2_domain/entities/company/company.entity");
class CompanyMapper {
    static toCreateData(entity) {
        return {
            company: entity.toCreateData(),
        };
    }
    static toUpdateData(entity) {
        return {
            company: entity.toUpdateData(),
        };
    }
    static toPersistEntity(record) {
        return company_entity_1.CompanyEntity.createPersistCom(record);
    }
}
exports.CompanyMapper = CompanyMapper;
//# sourceMappingURL=company.mapper.js.map