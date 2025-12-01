import { NextFunction, Request, Response } from "express";
import z from "zod";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

export type ControllerHandler = (
  req: Request,
  res: Response,
) => Promise<Response<any>>;

export class BaseController {
  constructor() {}

  validateOrThrow<T extends z.ZodTypeAny>(
    schema: T,
    data: {
      body?: unknown;
      query?: unknown;
      params?: unknown;
      userId?: number; //인증 jwt 페이로드로 들어오는 값
    },
  ) {
    const result = schema.safeParse(data);
    if (!result.success) {
      const issue = result.error.issues[0]; // 첫번째 형식 에러 먼저 처리

      throw new BusinessException({
        type: BusinessExceptionType.VALIDATION_ERROR,
        message: issue.message,
      });
    }
    return result.data;
  }
}
