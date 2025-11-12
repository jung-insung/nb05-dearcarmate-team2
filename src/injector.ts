import { CorsMiddleware } from "./1_inbound/middleware/cors.middleware";
import { GlobalErrorMiddleware } from "./1_inbound/middleware/global-error.middleware";
import { JsonMiddleware } from "./1_inbound/middleware/json.middleware";
import { LoggerMiddleware } from "./1_inbound/middleware/logger.middleware";
import { ConfigUtil } from "./4_shared/utils/config.util";
import { Server } from "./server";

export class Injector {
  private _server : Server;

  constructor() {
    this._server = this.injectDeps();
  }

  get server() {
    return this._server;
  }
  injectDeps() : Server {
    const configUtil = new ConfigUtil();
    const corsMiddleware = new CorsMiddleware(configUtil);
    const globalErrorMiddleware = new GlobalErrorMiddleware(configUtil);
    const jsonMiddleware = new JsonMiddleware(configUtil);
    const loggerMiddleware = new LoggerMiddleware(configUtil);
    return new Server(
      configUtil,
      corsMiddleware,
      loggerMiddleware,
      jsonMiddleware,
      globalErrorMiddleware
    );
  }
}