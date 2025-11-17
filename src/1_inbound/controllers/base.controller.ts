import { NextFunction, Request, Response } from "express";
import z from "zod";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

export type ControllerHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<Response<any>>;

export class BaseController {
  constructor() {}

  validateOrThrow<T extends z.ZodTypeAny>(
    schema: T,
    data: {
      body?: unknown;
      query?: unknown;
      params?: unknown;
      userId?: unknown; //인증 jwt 페이로드로 들어오는 값
    },
    exceptionMap: Record<string, BusinessExceptionType>,
  ) {
    const result = schema.safeParse(data);
    if (!result.success) {
      const issue = result.error.issues[0]; // 첫번째 형식 에러 먼저 처리
      const field = issue.path[0] as string;
      const matched =
        exceptionMap[field] || BusinessExceptionType.INVALID_REQUEST;

      throw new BusinessException({
        type: matched,
        message: issue.message,
      });
    }

    return result.data;
  }
}
