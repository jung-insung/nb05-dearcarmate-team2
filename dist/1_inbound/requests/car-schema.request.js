"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCarSchema = exports.registerCarSchema = exports.CAR_NUMBER_REGEX = void 0;
const zod_1 = require("zod");
exports.CAR_NUMBER_REGEX = /^[0-9]{2,3}[가-힣][0-9]{4}$/;
exports.registerCarSchema = zod_1.z.object({
    carNumber: zod_1.z
        .string({ message: "차량번호는 문자열이어야 합니다." })
        .nonempty({ message: "차량번호는 필수 입력 항목입니다." })
        .transform((v) => v.replace(/\s+/g, ""))
        .refine((v) => exports.CAR_NUMBER_REGEX.test(v), {
        message: "차량번호 형식이 올바르지 않습니다.",
    }),
    manufacturer: zod_1.z.enum(["기아", "현대", "쉐보레"], {
        message: "제조사는 '기아', '현대', '쉐보레' 중 하나여야 합니다.",
    }),
    model: zod_1.z
        .string({ message: "모델명은 문자열이어야 합니다." })
        .trim()
        .nonempty({ message: "모델명은 필수 입력 항목입니다." }),
    manufacturingYear: zod_1.z
        .number({ message: "제조년도는 숫자여야 합니다." })
        .int()
        .gte(1975, { message: "제조년도는 1975년 이상이어야 합니다." }),
    mileage: zod_1.z
        .number({ message: "주행거리는 숫자여야 합니다." })
        .int()
        .nonnegative({ message: "주행거리는 0 이상이어야 합니다." }),
    price: zod_1.z
        .number({ message: "가격은 숫자여야 합니다." })
        .int()
        .nonnegative({ message: "가격은 0 이상이어야 합니다." }),
    accidentCount: zod_1.z
        .number({ message: "사고 횟수는 숫자여야 합니다." })
        .int()
        .nonnegative({ message: "사고 횟수는 0 이상이어야 합니다." })
        .default(0),
    explanation: zod_1.z.string().trim().optional(),
    accidentDetails: zod_1.z.string().trim().optional(),
});
exports.updateCarSchema = exports.registerCarSchema
    .partial()
    .extend({ version: zod_1.z.number().int().optional() });
//# sourceMappingURL=car-schema.request.js.map