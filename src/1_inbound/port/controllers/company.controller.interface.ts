import { ControllerHandler } from "../../controllers/base.controller";

export interface ICompanyController {
  createCompany: ControllerHandler;
  updateCompany: ControllerHandler;
  deleteCompany: ControllerHandler;
}
