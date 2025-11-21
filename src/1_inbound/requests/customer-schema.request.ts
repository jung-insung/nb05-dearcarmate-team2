import { z } from "zod";

export const registCustomerSchema = z.object({
  body: z.object({
    name: z.string().trim().nonempty({ message: "필수 입력 사항입니다." }),

    gender: z.enum(["MALE", "FEMALE"]),

    phoneNumber: z
      .string()
      .trim()
      .nonempty({ message: "필수 입력 사항입니다." })
      .refine((data) => /^01[0-9]-\d{3,4}-\d{4}$/.test(data), {
        message: "연락처는 010-1234-5678 형식으로 입력해주세요.",
      }),

    ageGroup: z
      .enum([
        "TEN",
        "TWENTY",
        "THIRTY",
        "FOURTY",
        "FIFTY",
        "SIXTY",
        "SEVENTY",
        "EIGHTY",
      ])
      .optional(),

    region: z
      .enum([
        "SEOUL",
        "GYEONGGI",
        "INCHEON",
        "GANGWON",
        "CHUNGBUK",
        "CHUNGNAM",
        "SEJONG",
        "DAEJEON",
        "JEONBUK",
        "JEONNAM",
        "GWANGJU",
        "GYEONGBUK",
        "GYEONGNAM",
        "DAEGU",
        "ULSAN",
        "BUSAN",
        "JEJU",
      ])
      .optional(),

    email: z
      .string()
      .trim()
      .nonempty({ message: "필수 입력 사항입니다." })
      .refine(
        (data) =>
          /^[A-Za-z0-9.!#$%&'*+/=?^_`, ~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*$/.test(
            data,
          ),
        { message: "유효하지 않은 이메일 형식입니다." },
      ),

    memo: z.any().optional(),
  }),
});

export const updateCustomerSchema = registCustomerSchema.partial();

export const getCustomersQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(8),
  searchBy: z.enum(["name", "email"]).optional(),
  keyword: z.string().trim().min(1).optional(),
});

export type RegistCustomerReq = z.infer<typeof registCustomerSchema>;
export type UpdateCustomerReq = z.infer<typeof updateCustomerSchema>;
export type getCustomersQueryReq = z.infer<typeof getCustomersQuerySchema>;
