import z from "zod";

export type RegisterUserReqDto = z.infer<typeof registerUserReqSchema>;
export type UpdateUserReqDto = z.infer<typeof updateUserReqSchema>;
export type DeleteUserReqDto = z.infer<typeof deleteUserReqSchema>;
export type GetUserReqDto = z.infer<typeof getUserReqSchema>;

export const registerUserReqSchema = z.object({
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

    passwordConfirmation: z
      .string({ message: "비밀번호 확인은 문자열이어야 합니다." })
      .nonempty({ message: "비밀번호 확인은 필수 입력 항목입니다." })
      .trim(),

    name: z
      .string({ message: "이름은 문자열이어야 합니다." })
      .nonempty({ message: "이름은 필수 입력 항목입니다." }),

    employeeNumber: z
      .string({ message: "사번은 문자열이어야 합니다." })
      .nonempty({ message: "사번은 필수 입력 항목입니다." })
      .trim(),

    phoneNumber: z
      .string({ message: "전화번호는 문자열이어야 합니다." })
      .nonempty({ message: "전화번호는 필수 입력 항목입니다." })
      .trim()
      .regex(/^(\d{2,3}-\d{3,4}-\d{4}|\d{10,11})$/, {
        message: "유효한 전화번호 형식이 아닙니다.",
      }),

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

export const updateUserReqSchema = z.object({
  // userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),

  body: z.object({
    employeeNumber: z
      .string({ message: "사번은 문자열이어야 합니다." })
      .nonempty({ message: "수정할 사번을 입력하세요." })
      .trim(),

    phoneNumber: z
      .string({ message: "전화번호는 문자열이어야 합니다." })
      .nonempty({ message: "수정할 전화번호를 입력하세요." })
      .trim()
      .regex(/^(\d{2,3}-\d{3,4}-\d{4}|\d{10,11})$/, {
        message: "유효한 전화번호 형식이 아닙니다.",
      }),

    currentPassword: z
      .string({ message: "현재 비밀번호는 문자열이어야 합니다." })
      .nonempty({ message: "비밀번호를 입력하세요." })
      .trim(),

    password: z
      .string({ message: "비밀번호는 문자열이어야 합니다." })
      .trim()
      .optional(),

    passwordConfirmation: z
      .string({ message: "비밀번호는 문자열이어야 합니다." })
      .trim()
      .optional(),

    imageUrl: z.url({ message: "이미지url 형식이 아닙니다." }).trim(),
  }),
});

export const getUserReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
});
export const deleteUserReqSchema = z.object({
  userId: z.number({ message: "유저 ID는 숫자이어야 합니다." }),
});
