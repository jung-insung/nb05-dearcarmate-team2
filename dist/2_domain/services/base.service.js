"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
class BaseService {
    constructor(_unitOfWork) {
        this._unitOfWork = _unitOfWork;
    }
    async _getCompanyId(userId) {
        const user = await this._unitOfWork.repos.user.findUserById(userId);
        if (!user) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.NOT_FOUND,
                message: "존재하지 않는 사용자입니다.",
            });
        }
        if (!user.companyId) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.COMPANY_NOT_EXIST,
                message: "사용자에 소속된 회사 정보를 찾을 수 없습니다.",
            });
        }
        return user.companyId;
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map