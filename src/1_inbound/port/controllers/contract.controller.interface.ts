import { ControllerHandler } from "../../controllers/base.controller";

export interface IContractController {
  createContract: ControllerHandler;
  updateContract: ControllerHandler;
  getContractLists: ControllerHandler;
  getContractCars: ControllerHandler;
  getContractCustomers: ControllerHandler;
  getContractUsers: ControllerHandler;
}
