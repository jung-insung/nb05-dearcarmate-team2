import { ControllerHandler } from "../../controllers/base.controller";

export interface IContractController {
  getContractLists: ControllerHandler;
  getContractCars: ControllerHandler;
  getContractCustomers: ControllerHandler;
  getContractUsers: ControllerHandler;
  createContract: ControllerHandler;
  updateContractDetail: ControllerHandler;
  updateContractStatus: ControllerHandler;
}
