"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.configSchema = zod_1.default.object({
    PORT: zod_1.default.coerce.number(),
    SALT_LEVEL: zod_1.default.coerce
        .number()
        .min(8, "솔트 레벨은 최소 8이상으로 권장합니다.")
        .max(12, "솔트 레벨은 최대 12이하로 권장합니다."),
    NODE_ENV: zod_1.default.enum(["dev", "prod"]).default("dev"),
    CLIENT_DOMAIN: zod_1.default.string(),
    PUBLIC_PATH: zod_1.default.string(),
    JSON_LIMIT: zod_1.default.coerce.number(),
    MAX_RETRIES: zod_1.default.coerce.number(),
    OPTIMISTIC_LOCK_RETRY_DELAY_MS: zod_1.default.coerce.number(),
    TOKEN_SECRET: zod_1.default.string().min(8, "토큰 시크릿은 최소 8자 이상입니다."),
    ACCESS_TOKEN_EXPIRES_IN: zod_1.default.enum(["15m", "1h", "7h"]).default("1h"),
    REFRESH_TOKEN_EXPIRES_IN: zod_1.default.enum(["1d", "7d"]).default("1d"),
    FE_PORT: zod_1.default.coerce.number(),
});
//# sourceMappingURL=config.util.interface.js.map