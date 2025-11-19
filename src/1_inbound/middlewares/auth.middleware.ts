import { NextFunction, Request, Response } from "express";
import { ITokenUtil } from "../../4_shared/utils/token.util";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

export class AuthMiddleware {
  constructor(private _tokenUtil: ITokenUtil) {}

  isUserAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      authHeader.split(" ").length !== 2 ||
      authHeader.split(" ")[0] !== "Bearer"
    ) {
      throw new BusinessException({
        type: BusinessExceptionType.INVALID_AUTH,
      });
    }

    const accessToken = authHeader.split(" ")[1];
    const paylod = this._tokenUtil.verify(accessToken);
    req.userId = paylod.userId;
    if (!req.userId) {
      throw new BusinessException({
        type: BusinessExceptionType.USERID_NOT_EXIST,
      });
    }
    return next();
  };
}
