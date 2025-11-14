import { PrismaClient } from "@prisma/client";
import { CorsMiddleware } from "./1_inbound/middleware/cors.middleware";
import { GlobalErrorMiddleware } from "./1_inbound/middleware/global-error.middleware";
import { JsonMiddleware } from "./1_inbound/middleware/json.middleware";
import { LoggerMiddleware } from "./1_inbound/middleware/logger.middleware";
import { UserRouter } from "./1_inbound/router/user.router";
import { UserRepo } from "./3_outbound/repos/user.repo";
import { ConfigUtil } from "./4_shared/utils/config.util";
import { Server } from "./server";
import { UserService } from "./2_domain/services/user.service";
import { UserController } from "./1_inbound/controller/user.controller";

export class Injector {
  private _server: Server;

  constructor() {
    this._server = this.injectDeps();
  }

  get server() {
    return this._server;
  }
  injectDeps(): Server {
    const prisma = new PrismaClient();

    const configUtil = new ConfigUtil();
    const corsMiddleware = new CorsMiddleware(configUtil);
    const globalErrorMiddleware = new GlobalErrorMiddleware(configUtil);
    const jsonMiddleware = new JsonMiddleware(configUtil);
    const loggerMiddleware = new LoggerMiddleware(configUtil);

    const userRepo = new UserRepo(prisma);

    const userService = new UserService(userRepo);

    const userController = new UserController(userService);

    const userRouter = new UserRouter(userController);

    return new Server(
      userRouter,
      configUtil,
      corsMiddleware,
      loggerMiddleware,
      jsonMiddleware,
      globalErrorMiddleware
    );
  }
}