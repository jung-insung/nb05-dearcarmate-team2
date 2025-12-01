"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const client_1 = require("@prisma/client");
const cors_middleware_1 = require("./1_inbound/middlewares/cors.middleware");
const global_error_middleware_1 = require("./1_inbound/middlewares/global-error.middleware");
const json_middleware_1 = require("./1_inbound/middlewares/json.middleware");
const logger_middleware_1 = require("./1_inbound/middlewares/logger.middleware");
const user_router_1 = require("./1_inbound/routers/user.router");
const company_router_1 = require("./1_inbound/routers/company.router");
const car_router_1 = require("./1_inbound/routers/car.router");
const coustomer_router_1 = require("./1_inbound/routers/coustomer.router");
const contract_router_1 = require("./1_inbound/routers/contract.router");
const contract_doc_router_1 = require("./1_inbound/routers/contract-doc.router");
const user_repo_1 = require("./3_outbound/repos/user.repo");
const company_repo_1 = require("./3_outbound/repos/company.repo");
const customer_repo_1 = require("./3_outbound/repos/customer.repo");
const car_repo_1 = require("./3_outbound/repos/car.repo");
const contract_repo_1 = require("./3_outbound/repos/contract.repo");
const contract_doc_repo_1 = require("./3_outbound/repos/contract-doc.repo");
const config_util_1 = require("./4_shared/utils/config.util");
const server_1 = require("./server");
const user_service_1 = require("./2_domain/services/user.service");
const company_service_1 = require("./2_domain/services/company.service");
const car_service_1 = require("./2_domain/services/car.service");
const customer_service_1 = require("./2_domain/services/customer.service");
const contract_service_1 = require("./2_domain/services/contract.service");
const user_controller_1 = require("./1_inbound/controllers/user.controller");
const company_controller_1 = require("./1_inbound/controllers/company.controller");
const car_controller_1 = require("./1_inbound/controllers/car.controller");
const customer_controller_1 = require("./1_inbound/controllers/customer.controller");
const contract_controller_1 = require("./1_inbound/controllers/contract.controller");
const contract_doc_controller_1 = require("./1_inbound/controllers/contract-doc.controller");
const not_found_middleware_1 = require("./1_inbound/middlewares/not-found.middleware");
const bcrypt_hash_manager_1 = require("./3_outbound/managers/bcrypt-hash.manager");
const unit_of_work_1 = require("./3_outbound/unit-of-work");
const repo_factory_1 = require("./3_outbound/repo-factory");
const auth_router_1 = require("./1_inbound/routers/auth.router");
const auth_service_1 = require("./2_domain/services/auth.service");
const auth_controller_1 = require("./1_inbound/controllers/auth.controller");
const token_util_1 = require("./4_shared/utils/token.util");
const auth_middleware_1 = require("./1_inbound/middlewares/auth.middleware");
const file_upload_middleware_1 = require("./1_inbound/middlewares/file-upload.middleware");
const contract_doc_service_1 = require("./2_domain/services/contract-doc.service");
const image_controller_1 = require("./1_inbound/controllers/image.controller");
const image_router_1 = require("./1_inbound/routers/image.router");
const dashboard_service_1 = require("./2_domain/services/dashboard.service");
const dashboard_controller_1 = require("./1_inbound/controllers/dashboard.controller");
const dashboard_router_1 = require("./1_inbound/routers/dashboard.router");
const static_file_middleware_1 = require("./1_inbound/middlewares/static-file.middleware");
class Injector {
    constructor() {
        this._server = this.injectDeps();
    }
    get server() {
        return this._server;
    }
    injectDeps() {
        const prisma = new client_1.PrismaClient();
        const configUtil = new config_util_1.ConfigUtil();
        const tokenUtil = new token_util_1.TokenUtil(configUtil);
        const bcryptHashManger = new bcrypt_hash_manager_1.BcryptHashManager(configUtil);
        const corsMiddleware = new cors_middleware_1.CorsMiddleware(configUtil);
        const globalErrorMiddleware = new global_error_middleware_1.GlobalErrorMiddleware(configUtil);
        const jsonMiddleware = new json_middleware_1.JsonMiddleware(configUtil);
        const loggerMiddleware = new logger_middleware_1.LoggerMiddleware(configUtil);
        const notFoundMiddleware = new not_found_middleware_1.NotFoundMiddleware();
        const authMiddleware = new auth_middleware_1.AuthMiddleware(tokenUtil);
        const fileUploadMiddleware = new file_upload_middleware_1.FileUploadMiddleware();
        const staticFileMiddleware = new static_file_middleware_1.StaticFileMiddleware("/uploads", "../../../public");
        const repoFactory = new repo_factory_1.RepoFactory({
            user: (prisma) => new user_repo_1.UserRepo(prisma),
            company: (prisma) => new company_repo_1.CompanyRepo(prisma),
            car: (prisma) => new car_repo_1.CarRepo(prisma),
            customer: (prisma) => new customer_repo_1.CustomerRepo(prisma),
            contract: (prisma) => new contract_repo_1.ContractRepo(prisma),
            contractDoc: (prisma) => new contract_doc_repo_1.ContractDocRepo(prisma),
        });
        const unitOfWork = new unit_of_work_1.UnitOfWork(prisma, repoFactory, configUtil);
        const authService = new auth_service_1.AuthService(bcryptHashManger, tokenUtil, unitOfWork);
        const userService = new user_service_1.UserService(unitOfWork, bcryptHashManger);
        const companyService = new company_service_1.CompanyService(unitOfWork);
        const carService = new car_service_1.CarService(unitOfWork);
        const customerService = new customer_service_1.CustomerService(unitOfWork);
        const contractService = new contract_service_1.ContractService(unitOfWork);
        const contractDocService = new contract_doc_service_1.ContractDocService(unitOfWork);
        const dashboardService = new dashboard_service_1.DashboardService(unitOfWork);
        const authController = new auth_controller_1.AuthController(authService);
        const userController = new user_controller_1.UserController(userService);
        const companyController = new company_controller_1.CompanyController(companyService);
        const carController = new car_controller_1.CarController(carService);
        const customerController = new customer_controller_1.CustomerController(customerService);
        const contractController = new contract_controller_1.ContractController(contractService);
        const contractDocController = new contract_doc_controller_1.ContractDocController(contractDocService);
        const imageController = new image_controller_1.ImageController(userService);
        const dashboardController = new dashboard_controller_1.DashboardController(dashboardService);
        const authRouter = new auth_router_1.AuthRouter(authController);
        const userRouter = new user_router_1.UserRouter(userController, authMiddleware);
        const companyRouter = new company_router_1.CompanyRouter(companyController, authMiddleware);
        const carRouter = new car_router_1.CarRouter(carController, authMiddleware);
        const customerRouter = new coustomer_router_1.CustomerRouter(customerController, authMiddleware);
        const contractRouter = new contract_router_1.ContractRouter(contractController, authMiddleware);
        const contractDocRouter = new contract_doc_router_1.ContractDocRouter(contractDocController, authMiddleware, fileUploadMiddleware);
        const imageRouter = new image_router_1.ImageRouter(imageController, authMiddleware, fileUploadMiddleware);
        const dashboardRouter = new dashboard_router_1.DashBoardRouter(dashboardController, authMiddleware);
        return new server_1.Server(authRouter, userRouter, companyRouter, customerRouter, carRouter, contractRouter, contractDocRouter, imageRouter, dashboardRouter, configUtil, corsMiddleware, loggerMiddleware, jsonMiddleware, notFoundMiddleware, globalErrorMiddleware, staticFileMiddleware);
    }
}
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map