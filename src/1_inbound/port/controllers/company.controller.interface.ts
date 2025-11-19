import { ControllerHandler } from "../../controllers/base.controller";

export interface ICompanyController {
  getCompanyList: ControllerHandler;
  getUserList: ControllerHandler;
  createCompany: ControllerHandler;
  updateCompany: ControllerHandler;
  deleteCompany: ControllerHandler;
}
