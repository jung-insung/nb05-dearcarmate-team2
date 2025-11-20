import z from "zod";

export type GetCompanyListReqDto = z.infer<typeof getCompanyListReqSchema>;
export type GetUserListReqDto = z.infer<typeof getUserListReqSchema>;
export type CreateCompanyReqDto = z.infer<typeof createCompanyReqSchema>;
export type UpdateCompanyReqDto = z.infer<typeof updateCompanyReqSchema>;
export type DeleteCompanyReqDto = z.infer<typeof deleteCompanyReqSchema>;

export const getCompanyListReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  query: z.object({
    page: z.coerce
      .number({ message: "페이지 번호는 숫자여야 합니다." })
      .min(1)
      .default(1),

    pageSize: z.coerce
      .number({ message: "페이지 크기는 숫자여야 합니다." })
      .min(1)
      .default(8),

    searchBy: z.enum(["companyName", "companyCode"]).optional(),

    keyword: z.string().optional(),
  }),
});

export const getUserListReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  query: z.object({
    page: z.coerce
      .number({ message: "페이지 번호는 숫자여야 합니다." })
      .min(1)
      .default(1),

    pageSize: z.coerce
      .number({ message: "페이지 크기는 숫자여야 합니다." })
      .min(1)
      .default(8),

    searchBy: z.enum(["companyName", "name", "email"]).optional(),

    keyword: z.string().optional(),
  }),
});

export const createCompanyReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  body: z.object({
    companyName: z
      .string({ message: "회사 이름은 문자열이어야 합니다." })
      .nonempty({ message: "회사 이름은 필수 입력 항목입니다." })
      .trim(),

    companyCode: z
      .string({ message: "회사 코드는 문자열이어야 합니다." })
      .nonempty({ message: "회사 코드는 필수 입력 항목입니다." })
      .trim(),
  }),
});

export const updateCompanyReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  params: z.object({
    companyId: z.coerce.number({ message: "회사 ID는 숫자여야 합니다." }),
  }),

  body: z.object({
    companyName: z
      .string({ message: "회사 이름은 문자열이어야 합니다." })
      .trim()
      .optional(),

    companyCode: z
      .string({ message: "회사 코드는 문자열이어야 합니다." })
      .trim()
      .optional(),
  }),
});

export const deleteCompanyReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
  
  params: z.object({
    companyId: z.coerce.number({ message: "회사 ID는 숫자여야 합니다." }),
  }),
});
