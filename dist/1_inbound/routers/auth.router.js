"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const base_router_1 = require("./base.router");
class AuthRouter extends base_router_1.BaseRouter {
    constructor(_authController) {
        super("/auth");
        this._authController = _authController;
        this.registerAuthRouter();
    }
    registerAuthRouter() {
        this.router.post("/login", this.catch(this._authController.login));
        this.router.post("/refresh", this.catch(this._authController.refreshAccessToken));
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth.router.js.map