import { BaseRouter } from "./base.router";
import { ICompanyController } from "../port/controllers/company.controller.interface";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class CompanyRouter extends BaseRouter {
  constructor(private _companyController: ICompanyController,
    private _authMiddleware: AuthMiddleware,
  ) {
    super("/companies");
    this.registerCompanyRouter();
  }

  registerCompanyRouter() {
    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._companyController.getCompanyList));

    this.router.get(
      "/users",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._companyController.getUserList));

    this.router.post(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._companyController.createCompany));

    this.router.patch(
      "/:companyId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._companyController.updateCompany),
    );

    this.router.delete(
      "/:companyId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._companyController.deleteCompany),
    );
  }
}
