"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonMiddleware = void 0;
const express_1 = __importDefault(require("express"));
class JsonMiddleware {
    constructor(_configUtil) {
        this._configUtil = _configUtil;
        this.handler = () => {
            return express_1.default.json(this._options);
        };
        this._options = {
            limit: this._configUtil.getParsed().JSON_LIMIT,
        };
    }
}
exports.JsonMiddleware = JsonMiddleware;
//# sourceMappingURL=json.middleware.js.map