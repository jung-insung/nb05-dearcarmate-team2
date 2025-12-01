"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
class CorsMiddleware {
    constructor(_configUtil) {
        this._configUtil = _configUtil;
        this.handler = () => {
            return (0, cors_1.default)(this._option);
        };
        const protocol = this._configUtil.getParsed().NODE_ENV === "dev" ? "http" : "https";
        const clientDomain = this._configUtil.getParsed().NODE_ENV === "dev"
            ? `localhost:${this._configUtil.getParsed().FE_PORT}`
            : this._configUtil.getParsed().CLIENT_DOMAIN;
        const whitelist = [
            `${protocol}://${clientDomain}`,
            `${protocol}://www.${clientDomain}`,
        ];
        this._option = {
            origin: function (origin, callback) {
                if (!origin || whitelist.indexOf(origin) !== -1) {
                    callback(null, true);
                }
                else {
                    callback(new business_exception_1.BusinessException({
                        message: "허용되지 않은 도메인 요청입니다.",
                    }));
                }
            },
            credentials: true,
        };
    }
}
exports.CorsMiddleware = CorsMiddleware;
//# sourceMappingURL=cors.middleware.js.map