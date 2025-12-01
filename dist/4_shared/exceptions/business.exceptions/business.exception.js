"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessException = void 0;
const exception_info_1 = require("./exception-info");
class BusinessException extends Error {
    constructor(option) {
        if (option.type != undefined && option.message != undefined) {
            // type하고 message가 둘 다 있으면
            super(option.message ?? exception_info_1.BusinessExceptionTable[option.type].message);
            this.statusCode = exception_info_1.BusinessExceptionTable[option.type].statusCode;
        }
        else if (option.type != undefined) {
            // 타입만 있으면
            super(exception_info_1.BusinessExceptionTable[option.type].message);
            this.statusCode = exception_info_1.BusinessExceptionTable[option.type].statusCode;
        }
        else {
            super(option.message ?? "Business Exception");
            this.statusCode = 500;
        }
        this.type = option.type;
        Object.setPrototypeOf(this, BusinessException.prototype); // 프로토타입 체인 깨짐 방지
    }
}
exports.BusinessException = BusinessException;
//# sourceMappingURL=business.exception.js.map