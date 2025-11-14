import { z } from "zod";

const CAR_NUMBER_REGEX = /^[0-9]{2,3}[가-힣][0-9]{4}$/;

const registerCarSchema = z.object({
  carNumber: z
    .string()
    .trim()
    .nonempty({ message: "차량번호는 필수 입력 사항입니다." })
    .refine((v) => CAR_NUMBER_REGEX.test(v), {
      message: "차량번호 형식이 올바르지 않습니다. (예: 12가3456)",
    }),

  manufacturer: z.enum(["기아", "현대", "쉐보레"], {
    message: "유효하지 않은 제조사입니다.",
  }),

  model: z
    .string()
    .trim()
    .nonempty({ message: "차종은 필수 입력 사항입니다." }),

  type: z.enum(["세단", "경차", "SUV"], {
    message: "유효하지 않은 차량 타입입니다.",
  }),

  manufacturingYear: z
    .number()
    .int()
    .gte(1980, { message: "제조년도는 1980년 이후여야 합니다." }),

  mileage: z
    .number()
    .int()
    .nonnegative({ message: "주행거리는 0 이상이어야 합니다." }),

  price: z
    .number()
    .int()
    .nonnegative({ message: "가격은 0 이상이어야 합니다." }),

  accidentCount: z
    .number()
    .int()
    .nonnegative({ message: "사고 횟수는 0 이상이어야 합니다." })
    .default(0),

  explanation: z.string().trim().optional(),

  accidentDetails: z.string().trim().optional(),
});

const updateCarSchema = registerCarSchema.partial(); // PATCH는 일부만 수정 가능하니 partial로 옵셔녈로 바꿔줌.

export type RegisterCarReq = z.infer<typeof registerCarSchema>;
export type UpdateCarReq = z.infer<typeof updateCarSchema>;

export { registerCarSchema, updateCarSchema };
