import z from "zod";

export type CreateCompanyReqDto = z.infer<typeof createCompanyReqSchema>;
export type UpdateCompanyReqDto = z.infer<typeof updateCompanyReqSchema>;
export type DeleteCompanyReqDto = z.infer<typeof deleteCompanyReqSchema>;

export const createCompanyReqSchema = z.object({
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
  params: z.object({
    companyId: z.coerce.number({ message: "회사 ID는 숫자여야 합니다." }),
  }),
});
