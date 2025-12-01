"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserResDto = void 0;
class LoginUserResDto {
    constructor(entity, tokens) {
        this.user = {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            employeeNumber: entity.employeeNumber,
            phoneNumber: entity.phoneNumber,
            imageUrl: entity.imageUrl,
            isAdmin: entity.isAdmin,
            company: { companyName: entity.company.companyName },
        };
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
    }
}
exports.LoginUserResDto = LoginUserResDto;
//# sourceMappingURL=login-user.res.dto.js.map