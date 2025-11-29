import { AuthController } from "../controllers/auth.controller";
import { BaseRouter } from "./base.router";

export class AuthRouter extends BaseRouter {
  constructor(private _authController: AuthController) {
    super("/auth");
    this.registerAuthRouter();
  }

  registerAuthRouter() {
    this.router.post("/login", this.catch(this._authController.login));

    this.router.post(
      "/refresh",
      this.catch(this._authController.refreshAccessToken),
    );
  }
}
