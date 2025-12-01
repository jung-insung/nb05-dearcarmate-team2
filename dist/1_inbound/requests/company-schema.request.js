"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompanyReqSchema = exports.updateCompanyReqSchema = exports.createCompanyReqSchema = exports.getUserListReqSchema = exports.getCompanyListReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.getCompanyListReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    query: zod_1.default.object({
        page: zod_1.default.coerce
            .number({ message: "페이지 번호는 숫자여야 합니다." })
            .min(1)
            .default(1),
        pageSize: zod_1.default.coerce
            .number({ message: "페이지 크기는 숫자여야 합니다." })
            .min(1)
            .default(8),
        searchBy: zod_1.default.enum(["companyName", "companyCode"]).optional(),
        keyword: zod_1.default.string().optional(),
    }),
});
exports.getUserListReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    query: zod_1.default.object({
        page: zod_1.default.coerce
            .number({ message: "페이지 번호는 숫자여야 합니다." })
            .min(1)
            .default(1),
        pageSize: zod_1.default.coerce
            .number({ message: "페이지 크기는 숫자여야 합니다." })
            .min(1)
            .default(8),
        searchBy: zod_1.default.enum(["companyName", "name", "email"]).optional(),
        keyword: zod_1.default.string().optional(),
    }),
});
exports.createCompanyReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    body: zod_1.default.object({
        companyName: zod_1.default
            .string({ message: "회사 이름은 문자열이어야 합니다." })
            .nonempty({ message: "회사 이름은 필수 입력 항목입니다." })
            .trim(),
        companyCode: zod_1.default
            .string({ message: "회사 코드는 문자열이어야 합니다." })
            .nonempty({ message: "회사 코드는 필수 입력 항목입니다." })
            .trim(),
    }),
});
exports.updateCompanyReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    params: zod_1.default.object({
        companyId: zod_1.default.coerce.number({ message: "회사 ID는 숫자여야 합니다." }),
    }),
    body: zod_1.default.object({
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
exports.deleteCompanyReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    params: zod_1.default.object({
        companyId: zod_1.default.coerce.number({ message: "회사 ID는 숫자여야 합니다." }),
    }),
});
//# sourceMappingURL=company-schema.request.js.map