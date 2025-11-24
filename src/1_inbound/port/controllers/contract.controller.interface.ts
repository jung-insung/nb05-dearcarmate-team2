import { ControllerHandler } from "../../controllers/base.controller";

export interface IContractController {
  getContracts: ControllerHandler;
  getContractCars: ControllerHandler;
  getContractCustomers: ControllerHandler;
  getContractUsers: ControllerHandler;
}
