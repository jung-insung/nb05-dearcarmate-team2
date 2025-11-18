import { PrismaClient } from "@prisma/client";
import { CorsMiddleware } from "./1_inbound/middlewares/cors.middleware";
import { GlobalErrorMiddleware } from "./1_inbound/middlewares/global-error.middleware";
import { JsonMiddleware } from "./1_inbound/middlewares/json.middleware";
import { LoggerMiddleware } from "./1_inbound/middlewares/logger.middleware";

import { UserRouter } from "./1_inbound/routers/user.router";
import { CompanyRouter } from "./1_inbound/routers/company.router";

import { UserRepo } from "./3_outbound/repos/user.repo";
import { CompanyRepo } from "./3_outbound/repos/company.repo";

import { ConfigUtil } from "./4_shared/utils/config.util";
import { Server } from "./server";

import { UserService } from "./2_domain/services/user.service";
import { CompanyService } from "./2_domain/services/company.service";

import { UserController } from "./1_inbound/controllers/user.controller";
import { CompanyController } from "./1_inbound/controllers/company.controller";

import { NotFoundMiddleware } from "./1_inbound/middlewares/not-found.middleware";
import { BcryptHashManager } from "./3_outbound/managers/bcrypt-hash.manager";
import { UnitOfWork } from "./3_outbound/unit-of-work";
import { CompanyRepo } from "./3_outbound/repos/company.repo";
import { IRepos } from "./2_domain/port/repos/repos.interface";
import { RepoFactory } from "./3_outbound/repo-factory";

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

    const bcryptHashManger = new BcryptHashManager(configUtil);

    const corsMiddleware = new CorsMiddleware(configUtil);
    const globalErrorMiddleware = new GlobalErrorMiddleware(configUtil);
    const jsonMiddleware = new JsonMiddleware(configUtil);
    const loggerMiddleware = new LoggerMiddleware(configUtil);
    const notFoundMiddleware = new NotFoundMiddleware();

    const repoFactory = new RepoFactory({
      user: (prismaClient) => new UserRepo(prismaClient),
      company: () => new CompanyRepo(prismaClient),
    });
    
    const unitOfWork = new UnitOfWork(prisma, repoFactory, configUtil);
    
    const userService = new UserService(unitOfWork, bcryptHashManger);
    const companyService = new CompanyService(companyRepo);

    const userController = new UserController(userService);
    const companyController = new CompanyController(companyService);

    const userRouter = new UserRouter(userController);
    const companyRouter = new CompanyRouter(companyController);

    return new Server(
      userRouter,
      companyRouter,
      configUtil,
      corsMiddleware,
      loggerMiddleware,
      jsonMiddleware,
      notFoundMiddleware,
      globalErrorMiddleware,
    );
  }
}
