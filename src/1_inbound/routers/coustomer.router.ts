import { ICustomerConteroller } from "../controllers/customer.controller";
import { BaseRouter } from "./base.router";

export class CustomerRouter extends BaseRouter {
  constructor(private _customerController: ICustomerConteroller) {
    super("/customers");
    this.registCustomerRouter();
  }

  registCustomerRouter() {
    this.router.post("", this.catch(this._customerController.registCustomer));

    this.router.get("", this.catch());

    this.router.patch(
      "/:customerId",
      this.catch(this._customerController.updateCustomer),
    );

    this.router.delete(
      "/:customerId",
      this.catch(this._customerController.deleteCusomer),
    );

    this.router.get("/:customerId", this.catch());

    this.router.post("/uplaod", this.catch());
  }
}
