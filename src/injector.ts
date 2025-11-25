import { PrismaClient } from "@prisma/client";
import { CorsMiddleware } from "./1_inbound/middlewares/cors.middleware";
import { GlobalErrorMiddleware } from "./1_inbound/middlewares/global-error.middleware";
import { JsonMiddleware } from "./1_inbound/middlewares/json.middleware";
import { LoggerMiddleware } from "./1_inbound/middlewares/logger.middleware";

import { UserRouter } from "./1_inbound/routers/user.router";
import { CompanyRouter } from "./1_inbound/routers/company.router";
import { CarRouter } from "./1_inbound/routers/car.router";
import { CustomerRouter } from "./1_inbound/routers/coustomer.router";
import { ContractRouter } from "./1_inbound/routers/contract.router";
import { ContractDocRouter } from "./1_inbound/routers/contract-doc.router";

import { UserRepo } from "./3_outbound/repos/user.repo";
import { CompanyRepo } from "./3_outbound/repos/company.repo";
import { CustomerRepo } from "./3_outbound/repos/customer.repo";
import { CarRepo } from "./3_outbound/repos/car.repo";
import { ContractRepo } from "./3_outbound/repos/contract.repo";
import { ContractDocRepo } from "./3_outbound/repos/contract-doc.repo";

import { ConfigUtil } from "./4_shared/utils/config.util";
import { Server } from "./server";

import { UserService } from "./2_domain/services/user.service";
import { CompanyService } from "./2_domain/services/company.service";
import { CarService } from "./2_domain/services/car.service";
import { CustomerService } from "./2_domain/services/customer.service";
import { ContractService } from "./2_domain/services/contract.service";
import { ContractDocService } from "./2_domain/services/contractDoc.service";

import { UserController } from "./1_inbound/controllers/user.controller";
import { CompanyController } from "./1_inbound/controllers/company.controller";
import { CarController } from "./1_inbound/controllers/car.controller";
import { CustomerController } from "./1_inbound/controllers/customer.controller";
import { ContractController } from "./1_inbound/controllers/contract.controller";
import { ContractDocController } from "./1_inbound/controllers/contract-doc.controller";

import { NotFoundMiddleware } from "./1_inbound/middlewares/not-found.middleware";
import { BcryptHashManager } from "./3_outbound/managers/bcrypt-hash.manager";
import { UnitOfWork } from "./3_outbound/unit-of-work";
import { RepoFactory } from "./3_outbound/repo-factory";
import { AuthRouter } from "./1_inbound/routers/auth.router";
import { AuthService } from "./2_domain/services/auth.service";
import { AuthController } from "./1_inbound/controllers/auth.controller";
import { TokenUtil } from "./4_shared/utils/token.util";
import { AuthMiddleware } from "./1_inbound/middlewares/auth.middleware";
import { MulterMiddleware } from "./1_inbound/middlewares/multer.middleware";

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
    const tokenUtil = new TokenUtil(configUtil);

    const bcryptHashManger = new BcryptHashManager(configUtil);

    const corsMiddleware = new CorsMiddleware(configUtil);
    const globalErrorMiddleware = new GlobalErrorMiddleware(configUtil);
    const jsonMiddleware = new JsonMiddleware(configUtil);
    const loggerMiddleware = new LoggerMiddleware(configUtil);
    const notFoundMiddleware = new NotFoundMiddleware();
    const authMiddleware = new AuthMiddleware(tokenUtil);
    const multerMiddleware = new MulterMiddleware();

    const repoFactory = new RepoFactory({
      user: (prisma) => new UserRepo(prisma),
      company: (prisma) => new CompanyRepo(prisma),
      car: (prisma) => new CarRepo(prisma),
      customer: (prisma) => new CustomerRepo(prisma),
      contract: (prisma) => new ContractRepo(prisma),
      contractDoc: (prisma) => new ContractDocRepo(prisma),
    });

    const unitOfWork = new UnitOfWork(prisma, repoFactory, configUtil);

    const authService = new AuthService(
      bcryptHashManger,
      tokenUtil,
      unitOfWork,
    );
    const userService = new UserService(unitOfWork, bcryptHashManger);
    const companyService = new CompanyService(unitOfWork);
    const carService = new CarService(unitOfWork);
    const customerService = new CustomerService(unitOfWork);
    const contractService = new ContractService(unitOfWork);
    const contractDocService = new ContractDocService(unitOfWork);

    const authController = new AuthController(authService);
    const userController = new UserController(userService);
    const companyController = new CompanyController(companyService);
    const carController = new CarController(carService);
    const customerController = new CustomerController(customerService);
    const contractController = new ContractController(contractService);
    const contractDocController = new ContractDocController(contractDocService);

    const authRouter = new AuthRouter(authController);
    const userRouter = new UserRouter(userController, authMiddleware);
    const companyRouter = new CompanyRouter(companyController, authMiddleware);
    const carRouter = new CarRouter(carController, authMiddleware);
    const customerRouter = new CustomerRouter(
      customerController,
      authMiddleware,
    );
    const contractRouter = new ContractRouter(
      contractController,
      authMiddleware,
    );
    const contractDocRouter = new ContractDocRouter(
      contractDocController,
      authMiddleware,
      multerMiddleware,
    );

    return new Server(
      authRouter,
      userRouter,
      companyRouter,
      customerRouter,
      carRouter,
      contractRouter,
      contractDocRouter,
      configUtil,
      corsMiddleware,
      loggerMiddleware,
      jsonMiddleware,
      notFoundMiddleware,
      globalErrorMiddleware,
    );
  }
}
