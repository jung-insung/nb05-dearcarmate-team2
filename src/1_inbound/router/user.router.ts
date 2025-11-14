import { IUserController } from "../controller/user.controller";
import { BaseRouter } from "./base.router";

export class UserRouter extends BaseRouter{
  
  constructor(private _userController : IUserController) {
    super("/users");
    this.registerUserRouter();
  }

  registerUserRouter() {
    this.router.post(
      "",
      this.catch(this._userController.signUpUserController)
    );
  }
}