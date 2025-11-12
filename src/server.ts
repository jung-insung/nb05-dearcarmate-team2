import express from "express";
import { IConfigUtil } from "./4_shared/port/config.util.interface";
import { CorsMiddleware } from "./1_inbound/middleware/cors.middleware";
import { LoggerMiddleware } from "./1_inbound/middleware/logger.middleware";
import { JsonMiddleware } from "./1_inbound/middleware/json.middleware";
import { GlobalErrorMiddleware } from "./1_inbound/middleware/global-error.middleware";
export class Server {
  private _app;

  constructor(
    private _configManager: IConfigUtil,
    private _corsMiddleware: CorsMiddleware,
    private _loggerMiddleware: LoggerMiddleware,
    private _jsonMiddleware: JsonMiddleware,
    private _globalErrorMiddleware: GlobalErrorMiddleware,
  ) {
    this._app = express();
  }

  listen() {
    this._app.listen(this._configManager.getParsed().PORT, () => {
      console.log(
        `app server listening on port ${this._configManager.getParsed().PORT}`,
      );
    });
  };

  start() {
    this._app.use(this._corsMiddleware.handler);
    this._app.use(this._loggerMiddleware.handler);
    this._app.use(this._jsonMiddleware.handler);
    this._app.use(this._globalErrorMiddleware.handler);
    this.listen();
  }
}