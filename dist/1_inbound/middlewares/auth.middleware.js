"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
class AuthMiddleware {
    constructor(_tokenUtil) {
        this._tokenUtil = _tokenUtil;
        this.isUserAuthenticate = (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader ||
                authHeader.split(" ").length !== 2 ||
                authHeader.split(" ")[0] !== "Bearer") {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.INVALID_AUTH,
                });
            }
            const accessToken = authHeader.split(" ")[1];
            const paylod = this._tokenUtil.verify(accessToken);
            req.userId = paylod.userId;
            if (!req.userId) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.USERID_NOT_EXIST,
                });
            }
            return next();
        };
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map