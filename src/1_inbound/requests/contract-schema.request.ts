import z from "zod";

export type GetContractListReqDto = z.infer<typeof getContractListReqSchema>;
export type GetContractReqDto = z.infer<typeof getContractReqSchema>;

export const getContractListReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  query: z.object({
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(20),
    searchBy: z.enum(["customerName", "userName"]).optional(),
    keyword: z.string().optional(),
  }),
});

export const getContractReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  params: z.object({
    contractId: z.coerce.number({ message: "계약 ID는 숫자여야 합니다." }),
  }),
});
