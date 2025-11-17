export enum BusinessExceptionType {
  BAD_REQUEST,
  EMPLOYEENUMBER_TOO_LONG,
  INVALID_CAR_NUMBER,
  INVALID_MILEAGE,
  INVALID_PRICE,
  NAME_TOO_LONG,
  USERID_FORM,
  EMAIL_FORM,
  USERNAME_FORM,
  PASSWORD_FORM,
  EMPLOYEENUMBER_FORM,
  PHONENUMBER_FORM,
  COMPANYID_FORM,
  IMAGEURL_FORM,
  COMPANYNAME_FORM,
  COMPANYCODE_FORM,
  INVALID_REQUEST,
  NOT_FOUND,
  EMAIL_DUPLICATE,
  SIGNUP_PASSWORD_MISMATCH,
  PASSWORD_MISMATCH,
  COMPANY_NOT_EXIST,
}

export const BusinessExceptionTable: Record<
  BusinessExceptionType,
  { statusCode: number; message: string }
> = {
  // 형식 오류
  [BusinessExceptionType.BAD_REQUEST]: {
    statusCode: 400,
    message: "잘못된 요청입니다.",
  },
  [BusinessExceptionType.EMPLOYEENUMBER_TOO_LONG]: {
    statusCode: 404,
    message: "비밀번호가 너무 깁니다.",
  },
  [BusinessExceptionType.INVALID_CAR_NUMBER]: {
    statusCode: 404,
    message: "존재하지 않는 차량번호입니다.",
  },
  [BusinessExceptionType.INVALID_MILEAGE]: {
    statusCode: 404,
    message: "입력하신 주행 거리가 비정상적입니다.",
  },
  [BusinessExceptionType.INVALID_PRICE]: {
    statusCode: 404,
    message: "가격은 0이상이어야 합니다.",
  },
  [BusinessExceptionType.NAME_TOO_LONG]: {
    statusCode: 404,
    message: "이름은 최대 10자까지 입력해주세요.",
  },
  [BusinessExceptionType.USERID_FORM]: {
    statusCode: 400,
    message: "userId 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.EMAIL_FORM]: {
    statusCode: 400,
    message: "이메일 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.USERNAME_FORM]: {
    statusCode: 400,
    message: "이름 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.PASSWORD_FORM]: {
    statusCode: 400,
    message: "비밀번호 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.EMPLOYEENUMBER_FORM]: {
    statusCode: 400,
    message: "사원번호 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.PHONENUMBER_FORM]: {
    statusCode: 400,
    message: "전화번호 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.COMPANYID_FORM]: {
    statusCode: 400,
    message: "companyId 양식과 다릅니다.",
  [BusinessExceptionType.IMAGEURL_FORM]: {
    statusCode: 400,
    message: "이미지url 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.COMPANYNAME_FORM]: {
    statusCode: 400,
    message: "회사이름 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.COMPANYCODE_FORM]: {
    statusCode: 400,
    message: "회사코드 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.SIGNUP_PASSWORD_MISMATCH]: {
    statusCode: 401,
    message: "비밀번호와 비밀번호 확인이 서로 다릅니다.",
  },
  [BusinessExceptionType.PASSWORD_MISMATCH]: {
    statusCode: 401,
    message: "비밀번호가 서로 다릅니다.",
  },

  // 존재 유무
  [BusinessExceptionType.COMPANY_NOT_EXIST]: {
    statusCode: 404,
    message: "회사가 존재하지 않습니다.",
  },

  // 중복, 충돌
  [BusinessExceptionType.EMAIL_DUPLICATE]: {
    statusCode: 409,
    message: "이미 존재한 이메일입니다.",
  },

  // 기타
  [BusinessExceptionType.INVALID_REQUEST]: {
    statusCode: 500,
    message: "잘못된 요청입니다.",
  },
  [BusinessExceptionType.NOT_FOUND]: {
    statusCode: 404,
    message: "클라이언트가 요청한 경로가 없습니다.",
  },
};
