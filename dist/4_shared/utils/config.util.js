"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigUtil = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const config_util_interface_1 = require("../port/config.util.interface");
class ConfigUtil {
    constructor() {
        dotenv_1.default.config({
            path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
        });
        const result = config_util_interface_1.configSchema.safeParse(process.env);
        if (result.success) {
            this._parseConfig = result.data;
        }
        else {
            throw result.error;
        }
    }
    getParsed() {
        return this._parseConfig;
    }
}
exports.ConfigUtil = ConfigUtil;
//# sourceMappingURL=config.util.js.map