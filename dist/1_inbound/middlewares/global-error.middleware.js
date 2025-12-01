"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorMiddleware = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const technical_exception_1 = require("../../4_shared/exceptions/technical.exceptions/technical.exception");
class GlobalErrorMiddleware {
    constructor(_configUtil) {
        this._configUtil = _configUtil;
        this.handler = (err, req, res, next) => {
            const nodeEnv = this._configUtil.getParsed().NODE_ENV;
            if (err instanceof business_exception_1.BusinessException) {
                const { statusCode, message } = err;
                res.status(statusCode).json({ message });
                if (nodeEnv === "dev") {
                    console.log("[BusinessError] ", err);
                }
                return;
            }
            if (err instanceof technical_exception_1.TechnicalException) {
                const { message } = err;
                res.json({ message });
                if (nodeEnv === "dev") {
                    console.log("[TechnicalError]", err);
                }
                return;
            }
        };
    }
}
exports.GlobalErrorMiddleware = GlobalErrorMiddleware;
//# sourceMappingURL=global-error.middleware.js.map