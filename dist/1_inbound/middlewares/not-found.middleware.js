"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundMiddleware = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
class NotFoundMiddleware {
    constructor() {
        this.handler = () => {
            return (req, res, next) => {
                next(new business_exception_1.BusinessException({ type: exception_info_1.BusinessExceptionType.NOT_FOUND }));
            };
        };
    }
}
exports.NotFoundMiddleware = NotFoundMiddleware;
//# sourceMappingURL=not-found.middleware.js.map