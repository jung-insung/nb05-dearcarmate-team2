import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from "express";

export class BaseRouter {
  public router: Router;

  constructor(public basePath: string) {
    this.router = express.Router();
  }

  isAuthenticate(req: Request, res: Response, next: NextFunction): void {
    next();
  }

  /***
   * 비동기 에러를 처리하기 위해 try catch를 감싸서 재해석함.
   */
  catch(handler: RequestHandler) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
}
