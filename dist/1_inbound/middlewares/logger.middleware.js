"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
class LoggerMiddleware {
    constructor(_configUtil) {
        this._configUtil = _configUtil;
        this.handler = () => {
            return (0, morgan_1.default)(this._format);
        };
        this._format =
            this._configUtil.getParsed().NODE_ENV === "dev" ? "dev" : "combined";
    }
}
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map