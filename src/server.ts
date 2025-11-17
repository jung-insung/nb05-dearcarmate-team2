import express from "express";
import { IConfigUtil } from "./4_shared/port/config.util.interface";
import { CorsMiddleware } from "./1_inbound/middlewares/cors.middleware";
import { LoggerMiddleware } from "./1_inbound/middlewares/logger.middleware";
import { JsonMiddleware } from "./1_inbound/middlewares/json.middleware";
import { GlobalErrorMiddleware } from "./1_inbound/middlewares/global-error.middleware";
import { IUserRepo } from "./2_domain/port/repos/user.repo.interface";
import { UserRouter } from "./1_inbound/routers/user.router";
import { NotFoundMiddleware } from "./1_inbound/middlewares/not-found.middleware";
export class Server {
  private _app;

  constructor(
    private _userRouter: UserRouter,
    private _configUtil: IConfigUtil,
    private _corsMiddleware: CorsMiddleware,
    private _loggerMiddleware: LoggerMiddleware,
    private _jsonMiddleware: JsonMiddleware,
    private _notFoundMiddleware: NotFoundMiddleware,
    private _globalErrorMiddleware: GlobalErrorMiddleware,
  ) {
    this._app = express();
  }

  listen() {
    this._app.listen(this._configUtil.getParsed().PORT, () => {
      console.log(
        `app server listening on port ${this._configUtil.getParsed().PORT}`,
      );
    });
  }

  start() {
    this._app.use(this._corsMiddleware.handler());
    this._app.use(this._loggerMiddleware.handler());
    this._app.use(this._jsonMiddleware.handler());

    // routers
    this._app.use(this._userRouter.basePath, this._userRouter.router);

    this._app.use(this._notFoundMiddleware.handler());
    this._app.use(this._globalErrorMiddleware.handler);
    this.listen();
  }
}
