export enum BusinessExceptionType {
  BAD_REQUEST,
  PASSWORD_TOO_LONG,
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
  REFRESH_FORM,
  INVALID_REQUEST,
  NOT_FOUND,
  EMAIL_DUPLICATE,
  COMPANY_NAME_DUPLICATE,
  COMPANY_CODE_DUPLICATE,
  SIGNUP_PASSWORD_MISMATCH,
  PASSWORD_MISMATCH,
  COMPANY_NOT_EXIST,
  USER_NOT_EXIST,
  TOKEN_EXPIRED,
  TOKEN_MISMATCH,
  INVALID_AUTH,
  USERID_NOT_EXIST,
  REFRESHTOKEN_MISMATCH,
  CAR_NOT_EXIST,
  INVALID_CAR_NUMBER,
  INVALID_MANUFACTURER,
  INVALID_MODEL,
  INVALID_MANUFACTURINGYEAR,
  INVALID_MILEAGE,
  INVALID_PRICE,
  INVALID_ACCIDENTCOUNT,
  INVALID_EXPLANATION,
  INVALID_ACCIDENTDETAILS,
  CUSTOMER_NOT_EXIST,
  CUSTOMER_DATA_CHANGED,
  CUSTOMER_DATA_ARLEADY_DELETE,
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
  [BusinessExceptionType.PASSWORD_TOO_LONG]: {
    statusCode: 404,
    message: "비밀번호가 너무 깁니다.",
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
  },
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
  [BusinessExceptionType.REFRESH_FORM]: {
    statusCode: 400,
    message: "리플래쉬 토큰 양식이 안 맞습니다.",
  },
  [BusinessExceptionType.SIGNUP_PASSWORD_MISMATCH]: {
    statusCode: 401,
    message: "비밀번호와 비밀번호 확인이 서로 다릅니다.",
  },
  [BusinessExceptionType.PASSWORD_MISMATCH]: {
    statusCode: 401,
    message: "비밀번호가 일치하지 않습니다.",
  },
  [BusinessExceptionType.REFRESHTOKEN_MISMATCH]: {
    statusCode: 401,
    message: "리플래쉬 토큰이 일치하지 않습니다.",
  },
  [BusinessExceptionType.INVALID_AUTH]: {
    statusCode: 401,
    message: "인증이 유효하지 않습니다.",
  },
  [BusinessExceptionType.INVALID_CAR_NUMBER]: {
    statusCode: 404,
    message: "올바르지 않은 차량번호 형식입니다.",
  },
  [BusinessExceptionType.INVALID_MANUFACTURER]: {
    statusCode: 404,
    message: "제조사가 올바르지 않습니다.",
  },
  [BusinessExceptionType.INVALID_MODEL]: {
    statusCode: 404,
    message: "모델명이 올바르지 않습니다.",
  },
  [BusinessExceptionType.INVALID_MANUFACTURINGYEAR]: {
    statusCode: 404,
    message: "제조년도가 올바르지 않습니다.",
  },
  [BusinessExceptionType.INVALID_MILEAGE]: {
    statusCode: 404,
    message: "주행거리는 0이상이어야 합니다.",
  },
  [BusinessExceptionType.INVALID_PRICE]: {
    statusCode: 404,
    message: "가격은 0이상이어야 합니다.",
  },
  [BusinessExceptionType.INVALID_ACCIDENTCOUNT]: {
    statusCode: 404,
    message: "사고 횟수는 0이상이어야 합니다.",
  },
  [BusinessExceptionType.INVALID_EXPLANATION]: {
    statusCode: 404,
    message: "차량 설명 형식이 올바르지 않습니다.",
  },
  [BusinessExceptionType.INVALID_ACCIDENTDETAILS]: {
    statusCode: 404,
    message: "사고 상세 설명 형식이 올바르지 않습니다.",
  },

  // 존재 유무
  [BusinessExceptionType.COMPANY_NOT_EXIST]: {
    statusCode: 404,
    message: "회사가 존재하지 않습니다.",
  },
  [BusinessExceptionType.USER_NOT_EXIST]: {
    statusCode: 404,
    message: "유저가 존재하지 않습니다.",
  },
  [BusinessExceptionType.USERID_NOT_EXIST]: {
    statusCode: 404,
    message: "페이로드에 유저ID가 없습니다.",
  },
  [BusinessExceptionType.CUSTOMER_NOT_EXIST]: {
    statusCode: 404,
    message: "고객정보가 존재하지 않습니다.",
  },
  [BusinessExceptionType.CAR_NOT_EXIST]: {
    statusCode:404,
    message: "차량이 존재하지 않습니다."
  },

  // 중복, 충돌
  [BusinessExceptionType.EMAIL_DUPLICATE]: {
    statusCode: 409,
    message: "이미 존재한 이메일입니다.",
  },
  [BusinessExceptionType.COMPANY_NAME_DUPLICATE]: {
    statusCode: 409,
    message: "이미 존재한 회사 이름입니다.",
  },
  [BusinessExceptionType.COMPANY_CODE_DUPLICATE]: {
    statusCode: 409,
    message: "이미 존재한 회사 코드입니다.",
  },
  [BusinessExceptionType.CUSTOMER_DATA_CHANGED]: {
    statusCode: 409,
    message: "저장하지 못했습니다. 최신 정보로 새로고침 후 다시 시도해주세요",
  },
  [BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE]: {
    statusCode: 409,
    message: "요청하신 고객 정보가 삭제되었습니다.",
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
  [BusinessExceptionType.TOKEN_EXPIRED]: {
    statusCode: 401,
    message: "토큰이 만료되었습니다",
  },
  [BusinessExceptionType.TOKEN_MISMATCH]: {
    statusCode: 401,
    message: "올바른 토큰이 아닙니다.",
  },
};
