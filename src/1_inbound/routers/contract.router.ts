import { BaseRouter } from "./base.router";
import { IContractController } from "../port/controllers/contract.controller.interface";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ContractRouter extends BaseRouter {
  constructor(
    private _contractController: IContractController,
    private _authMiddleware: AuthMiddleware,
  ) {
    super("/contracts");
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.getContracts),
    );

    this.router.get(
      "/cars",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.getContractCars),
    );

    this.router.get(
      "/customers",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.getContractCustomers),
    );

    this.router.get(
      "/users",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.getContractUsers),
    );
    this.router.patch(
      "/:id",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.updateContractDetail),
    );
    this.router.patch(
      "/:id",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.updateContractStatus),
    );
  }
}
