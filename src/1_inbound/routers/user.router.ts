import { IUserController } from "../controllers/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { BaseRouter } from "./base.router";

export class UserRouter extends BaseRouter {
  constructor(
    private _userController: IUserController,
    private _authMiddleware: AuthMiddleware,
  ) {
    super("/users");
    this.registerUserRouter();
  }

  registerUserRouter() {
    this.router.post("", this.catch(this._userController.signUpUserController));

    this.router.patch(
      "/me",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._userController.updateUserController),
    );

    this.router.get(
      "/me",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._userController.getUserController),
    );

    this.router.delete(
      "/me",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._userController.deleteUserController),
    );

    this.router.delete(
      "/:userId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._userController.deleteUserController),
    );
  }
}
