import { CustomerController } from "../controllers/customer.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { BaseRouter } from "./base.router";
import multer from "multer";

const upload = multer();

export class CustomerRouter extends BaseRouter {
  constructor(
    private _customerController: CustomerController,
    private _authMiddleware: AuthMiddleware,
  ) {
    super("/customers");
    this.registCustomerRouter();
  }

  registCustomerRouter() {
    this.router.post(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._customerController.registCustomer),
    );

    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._customerController.getCustomers),
    );

    this.router.patch(
      "/:customerId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._customerController.updateCustomer),
    );

    this.router.delete(
      "/:customerId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._customerController.deleteCusomer),
    );

    this.router.get(
      "/:customerId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._customerController.getCustomer),
    );

    this.router.post(
      "/uplaod",
      upload.single("file"),
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._customerController.uploadCustomers),
    );
  }
}
