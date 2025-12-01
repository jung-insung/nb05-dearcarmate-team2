"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardRouter = void 0;
const base_router_1 = require("./base.router");
class DashBoardRouter extends base_router_1.BaseRouter {
    constructor(_dashboardController, _authMiddleware) {
        super("/dashboard");
        this._dashboardController = _dashboardController;
        this._authMiddleware = _authMiddleware;
        this.registerDashBoardRouter();
    }
    registerDashBoardRouter() {
        this.router.get("/", this._authMiddleware.isUserAuthenticate, this.catch(this._dashboardController.getDashboardData));
    }
}
exports.DashBoardRouter = DashBoardRouter;
//# sourceMappingURL=dashboard.router.js.map