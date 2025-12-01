"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
class BaseController {
    constructor() { }
    validateOrThrow(schema, data) {
        const result = schema.safeParse(data);
        if (!result.success) {
            const issue = result.error.issues[0]; // 첫번째 형식 에러 먼저 처리
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.VALIDATION_ERROR,
                message: issue.message,
            });
        }
        return result.data;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map