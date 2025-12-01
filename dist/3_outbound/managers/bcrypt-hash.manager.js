"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHashManager = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptHashManager {
    constructor(_configManager) {
        this._configManager = _configManager;
    }
    async hash(password) {
        const salt = await bcrypt_1.default.genSalt(this._configManager.getParsed().SALT_LEVEL);
        return await bcrypt_1.default.hash(password, salt);
    }
    async compare(inputValue, hashedValueFromDB) {
        return await bcrypt_1.default.compare(inputValue, hashedValueFromDB);
    }
}
exports.BcryptHashManager = BcryptHashManager;
//# sourceMappingURL=bcrypt-hash.manager.js.map