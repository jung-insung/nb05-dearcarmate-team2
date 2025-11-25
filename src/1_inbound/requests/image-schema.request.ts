import z from "zod";

export type imageUploadReqDto = z.infer<typeof imageUploadReqSchema>;

export const imageUploadReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
  body: z.object({
    fileName: z
      .string({ message: "파일명은 문자열이어야 합니다." })
      .nonempty({ message: "파일명은 필수 입력 항목입니다." })
      .trim(),
    url: z.url({ message: "url 형식이 맞지 않습니다."})
  })
});