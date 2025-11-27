import z from "zod";

export type getDashboardDataReqDto = z.infer<typeof getDashboardDataReqSchema>;

export const getDashboardDataReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
});
