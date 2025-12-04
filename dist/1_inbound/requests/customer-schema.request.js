"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomersQuerySchema = exports.updateCustomerSchema = exports.registCustomerSchema = void 0;
const zod_1 = require("zod");
const customer_normalizer_util_1 = require("../../4_shared/utils/customer-normalizer.util");
exports.registCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().nonempty({ message: "필수 입력 사항입니다." }),
        gender: zod_1.z
            .string()
            .trim()
            .transform((v) => (0, customer_normalizer_util_1.normalizeGender)(v)),
        phoneNumber: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "필수 입력 사항입니다." })
            .refine((data) => /^01[0-9]-\d{3,4}-\d{4}$/.test(data), {
            message: "연락처는 010-1234-5678 형식으로 입력해주세요.",
        }),
        ageGroup: zod_1.z
            .string()
            .trim()
            .nullish()
            .optional()
            .transform((v) => v ? (0, customer_normalizer_util_1.normalizeAgeGroup)(v) : undefined),
        region: zod_1.z
            .string()
            .trim()
            .nullish()
            .optional()
            .transform((v) => v ? (0, customer_normalizer_util_1.normalizeRegion)(v) : undefined),
        email: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "필수 입력 사항입니다." })
            .refine((data) => /^[A-Za-z0-9.!#$%&'*+/=?^_`, ~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/.test(data), { message: "유효하지 않은 이메일 형식입니다." }),
        memo: zod_1.z.any().optional().nullish(),
    }),
});
exports.updateCustomerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().trim().nonempty({ message: "필수 입력 사항입니다." }),
        gender: zod_1.z
            .string()
            .trim()
            .transform((v) => (0, customer_normalizer_util_1.normalizeGender)(v)),
        phoneNumber: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "필수 입력 사항입니다." })
            .refine((data) => /^01[0-9]-\d{3,4}-\d{4}$/.test(data), {
            message: "연락처는 010-1234-5678 형식으로 입력해주세요.",
        }),
        ageGroup: zod_1.z
            .string()
            .trim()
            .nullish()
            .optional()
            .transform((v) => v ? (0, customer_normalizer_util_1.normalizeAgeGroup)(v) : undefined),
        region: zod_1.z
            .string()
            .trim()
            .nullish()
            .optional()
            .transform((v) => v ? (0, customer_normalizer_util_1.normalizeRegion)(v) : undefined),
        email: zod_1.z
            .string()
            .trim()
            .nonempty({ message: "필수 입력 사항입니다." })
            .refine((data) => /^[A-Za-z0-9.!#$%&'*+/=?^_`, ~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/.test(data), { message: "유효하지 않은 이메일 형식입니다." }),
        memo: zod_1.z.any().optional().nullish(),
    }),
});
exports.getCustomersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    pageSize: zod_1.z.coerce.number().int().min(1).max(100).default(8),
    searchBy: zod_1.z.enum(["name", "email"]).optional(),
    keyword: zod_1.z.string().trim().optional(),
});
//# sourceMappingURL=customer-schema.request.js.map