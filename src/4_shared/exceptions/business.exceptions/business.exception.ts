import { BusinessExceptionTable, BusinessExceptionType } from "./exception-info";

export type ExceptionInfoType = {
  statusCode: number,
  message?: string
}

export class BusinessException extends Error {
  public readonly statusCode: number;
  public readonly type?: BusinessExceptionType;
  public readonly original?: Error;

  constructor(option: {
    message?: string,
    type?: BusinessExceptionType,
    error?: Error
  }) {
    if (option.type != undefined && option.message != undefined) { // type하고 message가 둘 다 있으면
      super(option.message ?? BusinessExceptionTable[option.type].message);
      this.statusCode = BusinessExceptionTable[option.type].statusCode;
    } else if (option.type != undefined) { // 타입만 있으면
      super(BusinessExceptionTable[option.type].message);
      this.statusCode = BusinessExceptionTable[option.type].statusCode;
    } else {
      super(option.message ?? "Business Exception");
      this.statusCode = 500;
    }
    this.type = option.type;

    Object.setPrototypeOf(this, BusinessException.prototype); // 프로토타입 체인 깨짐 방지
  }
}