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
  COMPANYNAME_FORM,
  COMPANYCODE_FORM,
  INVALID_REQUEST,
  NOT_FOUND,
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
  [BusinessExceptionType.COMPANYNAME_FORM]: {
    statusCode: 400,
    message: "회사이름 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.COMPANYCODE_FORM]: {
    statusCode: 400,
    message: "회사코드 양식이 안 맞습니다.",
  },

  // 필수 값 누락
  // 중복, 충돌
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
