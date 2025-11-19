import { BaseRouter } from "./base.router";
import { ICompanyController } from "../port/controllers/company.controller.interface";

export class CompanyRouter extends BaseRouter {
  constructor(private _companyController: ICompanyController) {
    super("/companies");
    this.registerCompanyRouter();
  }

  registerCompanyRouter() {
    this.router.get(
			"/",
			this.catch(this._companyController.getCompanyList),
		);

		this.router.get(
			"/users",
			this.catch(this._companyController.getUserList),
		);

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
