import { DashboardController } from "../controllers/dashboard.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { BaseRouter } from "./base.router";

export class DashBoardRouter extends BaseRouter {
  constructor(
    private _dashboardController: DashboardController,
    private _authMiddleware: AuthMiddleware
  ) {
    super("/dashboard");
    this.registerDashBoardRouter();
  }

  registerDashBoardRouter() {
    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._dashboardController.getDashboardData)
    )
  }
}