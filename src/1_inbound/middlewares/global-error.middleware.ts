import { NextFunction, Request, Response } from "express";
import { IConfigUtil } from "../../4_shared/port/config.util.interface";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";

export class GlobalErrorMiddleware {
  constructor(private _configUtil: IConfigUtil) { }

  handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const nodeEnv = this._configUtil.getParsed().NODE_ENV;

    if (err instanceof BusinessException) {
      const { statusCode, message } = err;
      res.status(statusCode).json({ message });

      if (nodeEnv === "dev") {
        console.log("[BusinessError] ", err);
      }
      return;
    }

    if (err instanceof TechnicalException) {
      const { message } = err;
      res.json({ message });

      if (nodeEnv === "dev") {
        console.log("[TechnicalError]", err);
      }
      return;
    }

    res.status(500).json({ message: "알 수 없는 에러가 발생했습니다." });
    console.error(err);
    return;
  };
}
