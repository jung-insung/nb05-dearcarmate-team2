"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUserResDto = void 0;
class BaseUserResDto {
    constructor(entity) {
        this.id = entity.id;
        this.name = entity.name;
        this.email = entity.email;
        this.employeeNumber = entity.employeeNumber;
        this.phoneNumber = entity.phoneNumber;
        this.imageUrl = entity.imageUrl;
        this.isAdmin = entity.isAdmin;
        this.company = {
            companyName: entity.company.companyName,
        };
    }
}
exports.BaseUserResDto = BaseUserResDto;
//# sourceMappingURL=base.user.res.dto.js.map