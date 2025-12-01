import { BaseRouter } from "./base.router";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ContractController } from "../controllers/contract.controller";

export class ContractRouter extends BaseRouter {
  constructor(
    private _contractController: ContractController,
    private _authMiddleware: AuthMiddleware,
  ) {
    super("/contracts");
    this.registercontractRouter();
  }

  private registercontractRouter() {
    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.getContractLists),
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

    this.router.post(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.createContract),
    );

    this.router.patch(
      "/:id",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.updateContract),
    );

    this.router.delete(
      "/:contractId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractController.deleteContract),
    );
  }
}
