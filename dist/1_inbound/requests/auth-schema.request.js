"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessTokenReqSchema = exports.loginReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.loginReqSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({ message: "이메일는 문자열이어야 합니다." })
            .nonempty({ message: "이메일은 필수 항목입니다." })
            .trim()
            .email({ message: "유효한 이메일 형식이 아닙니다." }),
        password: zod_1.default
            .string({ message: "비밀번호는 문자열이어야 합니다." })
            .nonempty({ message: "비밀번호는 필수 입력 항목입니다." })
            .trim(),
    }),
});
exports.refreshAccessTokenReqSchema = zod_1.default.object({
    body: zod_1.default.object({
        refreshToken: zod_1.default
            .string({ message: "리플래쉬 토큰은 문자열이어야 합니다." })
            .nonempty({ message: "리플래쉬 토큰은 필수 항목입니다." })
            .trim(),
    }),
});
//# sourceMappingURL=auth-schema.request.js.map