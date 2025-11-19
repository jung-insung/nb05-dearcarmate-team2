import z from "zod";

export type LoginReqDto = z.infer<typeof loginReqSchema>;
export type RefreshAccessTokenReqDto = z.infer<
  typeof refreshAccessTokenReqSchema
>;

export const loginReqSchema = z.object({
  body: z.object({
    email: z
      .string({ message: "이메일는 문자열이어야 합니다." })
      .nonempty({ message: "이메일은 필수 항목입니다." })
      .trim()
      .email({ message: "유효한 이메일 형식이 아닙니다." }),

    password: z
      .string({ message: "비밀번호는 문자열이어야 합니다." })
      .nonempty({ message: "비밀번호는 필수 입력 항목입니다." })
      .trim(),
  }),
});

export const refreshAccessTokenReqSchema = z.object({
  body: z.object({
    refreshToken: z
      .string({ message: "리플래쉬 토큰은 문자열이어야 합니다." })
      .nonempty({ message: "리플래쉬 토큰은 필수 항목입니다." })
      .trim(),
  }),
});
