"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserReqSchema = exports.getUserReqSchema = exports.updateUserReqSchema = exports.registerUserReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerUserReqSchema = zod_1.default.object({
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
        passwordConfirmation: zod_1.default
            .string({ message: "비밀번호 확인은 문자열이어야 합니다." })
            .nonempty({ message: "비밀번호 확인은 필수 입력 항목입니다." })
            .trim(),
        name: zod_1.default
            .string({ message: "이름은 문자열이어야 합니다." })
            .nonempty({ message: "이름은 필수 입력 항목입니다." }),
        employeeNumber: zod_1.default
            .string({ message: "사번은 문자열이어야 합니다." })
            .nonempty({ message: "사번은 필수 입력 항목입니다." })
            .trim(),
        phoneNumber: zod_1.default
            .string({ message: "전화번호는 문자열이어야 합니다." })
            .nonempty({ message: "전화번호는 필수 입력 항목입니다." })
            .trim()
            .regex(/^(\d{2,3}-\d{3,4}-\d{4}|\d{10,11})$/, {
            message: "유효한 전화번호 형식이 아닙니다.",
        }),
        companyName: zod_1.default
            .string({ message: "회사 이름은 문자열이어야 합니다." })
            .trim()
            .optional(),
        companyCode: zod_1.default
            .string({ message: "회사 코드는 문자열이어야 합니다." })
            .trim()
            .optional(),
    }),
});
exports.updateUserReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    body: zod_1.default.object({
        employeeNumber: zod_1.default
            .string({ message: "사번은 문자열이어야 합니다." })
            .nonempty({ message: "수정할 사번을 입력하세요." })
            .trim(),
        phoneNumber: zod_1.default
            .string({ message: "전화번호는 문자열이어야 합니다." })
            .nonempty({ message: "수정할 전화번호를 입력하세요." })
            .trim()
            .regex(/^(\d{2,3}-\d{3,4}-\d{4}|\d{10,11})$/, {
            message: "유효한 전화번호 형식이 아닙니다.",
        }),
        currentPassword: zod_1.default
            .string({ message: "현재 비밀번호는 문자열이어야 합니다." })
            .nonempty({ message: "비밀번호를 입력하세요." })
            .trim(),
        password: zod_1.default
            .string({ message: "비밀번호는 문자열이어야 합니다." })
            .trim()
            .optional(),
        passwordConfirmation: zod_1.default
            .string({ message: "비밀번호는 문자열이어야 합니다." })
            .trim()
            .optional(),
        imageUrl: zod_1.default
            .string({ message: "이미지url이 문자열이 아닙니다." })
            .url({ message: "이미지url 형식이 아닙니다." })
            .nullable(),
    }),
});
exports.getUserReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
});
exports.deleteUserReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    params: zod_1.default.object({
        userId: zod_1.default.coerce.number({ message: "유저 ID는 숫자이어야 합니다." }),
    }),
});
//# sourceMappingURL=user-schema.request.js.map