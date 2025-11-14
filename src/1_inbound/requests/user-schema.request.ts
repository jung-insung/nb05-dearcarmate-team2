import z from "zod";

export const userReqSchema = z.object({
  body: z.object({
    email: z.string({ message: "이메일는 문자열이어야 합니다." })
      .nonempty({ message: "이메일은 필수 항목입니다." })
      .email({ message: "유효한 이메일 형식이 아닙니다." }),

    password: z.string({ message: "비밀번호는 문자열이어야 합니다." })
      .nonempty({ message: "비밀번호는 필수 입력 항목입니다." }),

    passwordConfirmation: z.string({ message: "비밀번호 확인은 문자열이어야 합니다." })
      .nonempty({ message: "비밀번호 확인은 필수 입력 항목입니다." }),

    name: z.string({ message: "이름은 문자열이어야 합니다." })
      .nonempty({ message: "이름은 필수 입력 항목입니다." }),

    employeeNumber: z.string({ message: "사번은 문자열이어야 합니다." })
      .nonempty({ message: "사번은 필수 입력 항목입니다." }),

    phoneNumber: z.string({ message: "전화번호는 문자열이어야 합니다." })
      .nonempty({ message: "전화번호는 필수 입력 항목입니다." })
      .regex(/^(\d{2,3}-\d{3,4}-\d{4}|\d{10,11})$/, { message: "유효한 전화번호 형식이 아닙니다." }),

    companyName: z.string({ message: "회사 이름은 문자열이어야 합니다." })
      .nonempty({ message: "회사 이름은 필수 입력 항목입니다." }),

    companyCode: z.string({ message: "회사 코드는 문자열이어야 합니다." })
      .nonempty({ message: "회사 코드는 필수 입력 항목입니다." }),
  }),
});