import z from "zod";

export type ContractDocListReqDto = z.infer<typeof contractDocListReqSchema>;
export type ContractDocDraftListReqDto = z.infer<typeof contractDocDraftListReqSchema>;
export type ContractDocUploadReqDto = z.infer<typeof contractDocUploadReqSchema>;
export type ContractDocDownloadReqDto = z.infer<typeof contractDocDownLoadReqSchema>;

export const contractDocListReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  query: z.object({
    page: z.coerce.number().default(1),

    pageSize: z.coerce.number().default(8),

    searchBy: z.enum(["ContractName", "userName", "carNumber"]).optional().default("ContractName"),

    keyword: z.string().optional(),
  })
});

export const contractDocDraftListReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
});

export const contractDocUploadReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
  body: z.object({
    fileName: z.string({ message: "파일명은 문자열이어야 합니다." })
      .nonempty({ message: "파일명은 필수 입력 항목입니다." })
      .trim(),
  })
});

export const contractDocDownLoadReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
});

