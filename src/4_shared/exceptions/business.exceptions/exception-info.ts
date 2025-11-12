export enum BusinessExceptionType {
  EMPLOYEENUMBER_TOO_LONG,
  INVALID_CAR_NUMBER,
  INVALID_MILEAGE,
  INVALID_PRICE,
}

export const BusinessExceptionTable: Record<BusinessExceptionType, {statusCode: number, message: string}> = {
  [BusinessExceptionType.EMPLOYEENUMBER_TOO_LONG]: {
    statusCode: 404,
    message: "비밀번호가 너무 깁니다.",
  },
  [BusinessExceptionType.INVALID_CAR_NUMBER]: {
    statusCode: 404,
    message: "존재하지 않는 차량번호입니다."
  },
  [BusinessExceptionType.INVALID_MILEAGE]: {
    statusCode: 404,
    message: "입력하신 주행 거리가 비정상적입니다."
  },
  [BusinessExceptionType.INVALID_PRICE]: {
    statusCode: 404,
    message: "가격은 0이상이어야 합니다."
  }
}