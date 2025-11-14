import { NextFunction, Request, Response } from "express"
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception"
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info"

export class NotFoundMiddleware {
  constructor() { };

  handler = () => {
    return (req: Request, res: Response, next: NextFunction) => {
      next(
        new BusinessException({ type: BusinessExceptionType.NOT_FOUND })
      );
    }
  };
}