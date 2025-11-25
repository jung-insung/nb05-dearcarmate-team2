import { ControllerHandler } from "../../controllers/base.controller";

export interface IContractController {
  createContract: ControllerHandler;
  updateContractDetail: ControllerHandler;
  updateContractStatus: ControllerHandler;
  getContractLists: ControllerHandler;
  getContractCars: ControllerHandler;
  getContractCustomers: ControllerHandler;
  getContractUsers: ControllerHandler;
}
