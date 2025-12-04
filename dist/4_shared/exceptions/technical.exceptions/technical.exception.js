"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicalException = void 0;
const exception_info_1 = require("./exception-info");
class TechnicalException extends Error {
    constructor(options) {
        super(options.message ?? exception_info_1.TechnicaalExceptionTable[options.type]);
        this.type = options.type;
        this.original = options.error;
        this.meta = options.meta;
    }
}
exports.TechnicalException = TechnicalException;
//# sourceMappingURL=technical.exception.js.map