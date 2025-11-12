import { z } from "zod"

const registerCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "필수 입력 사항입니다." })
    .max(10, { message: "이름은 최대 10자까지 입력해주세요." }),

  phoneNumber: z
    .string()
    .trim()
    .nonempty({ message: "필수 입력 사항입니다." })
    .refine(
      (data) => /^01[0-9]-\d{3,4}-\d{4}$/.test(data),
      { message: "연락처는 010-1234-5678 형식으로 입력해주세요." }),

  email: z
  .string()
  .trim()
  .nonempty({ message: "필수 입력 사항입니다." })
  .refine(
    (data) =>
      /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/.test(
        data
      ),
    { message: "유효하지 않은 이메일 형식입니다." })
});

export type RegisterCustomerReq = z.infer<typeof registerCustomerSchema>;

export { registerCustomerSchema };