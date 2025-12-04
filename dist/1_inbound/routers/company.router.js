"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRouter = void 0;
const base_router_1 = require("./base.router");
class CompanyRouter extends base_router_1.BaseRouter {
    constructor(_companyController, _authMiddleware) {
        super("/companies");
        this._companyController = _companyController;
        this._authMiddleware = _authMiddleware;
        this.registerCompanyRouter();
    }
    registerCompanyRouter() {
        this.router.get("/", this._authMiddleware.isUserAuthenticate, this.catch(this._companyController.getCompanyList));
        this.router.get("/users", this._authMiddleware.isUserAuthenticate, this.catch(this._companyController.getUserList));
        this.router.post("/", this._authMiddleware.isUserAuthenticate, this.catch(this._companyController.createCompany));
        this.router.patch("/:companyId", this._authMiddleware.isUserAuthenticate, this.catch(this._companyController.updateCompany));
        this.router.delete("/:companyId", this._authMiddleware.isUserAuthenticate, this.catch(this._companyController.deleteCompany));
    }
}
exports.CompanyRouter = CompanyRouter;
//# sourceMappingURL=company.router.js.map