import { BaseRouter } from "./base.router";
import { ICompanyController } from "../port/controllers/company.controller.interface";

export class CompanyRouter extends BaseRouter {
  private _companyController;

  constructor(companyController: ICompanyController) {
    super("/companies");
    this._companyController = companyController;
    this.registerCompanyRouter();
  }

  private registerCompanyRouter() {
    this.router.post("/", this.catch(this._companyController.createCompany));

    this.router.patch(
      "/:companyId",
      this.catch(this._companyController.updateCompany),
    );

    this.router.delete(
      "/:companyId",
      this.catch(this._companyController.deleteCompany),
    );
  }
}
