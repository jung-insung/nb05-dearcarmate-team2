import { IUserController } from "../controllers/user.controller";
import { BaseRouter } from "./base.router";

export class UserRouter extends BaseRouter {
  constructor(private _userController: IUserController) {
    super("/users");
    this.registerUserRouter();
  }

  registerUserRouter() {
    this.router.post("", this.catch(this._userController.signUpUserController));
    this.router.patch(
      "/me",
      this.catch(this._userController.updateUserController),
    );
  }
}
