"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const base_router_1 = require("./base.router");
class UserRouter extends base_router_1.BaseRouter {
    constructor(_userController, _authMiddleware) {
        super("/users");
        this._userController = _userController;
        this._authMiddleware = _authMiddleware;
        this.registerUserRouter();
    }
    registerUserRouter() {
        this.router.post("", this.catch(this._userController.signUpUserController));
        this.router.patch("/me", this._authMiddleware.isUserAuthenticate, this.catch(this._userController.updateUserController));
        this.router.get("/me", this._authMiddleware.isUserAuthenticate, this.catch(this._userController.getUserController));
        this.router.delete("/me", this._authMiddleware.isUserAuthenticate, this.catch(this._userController.deleteUserController));
        this.router.delete("/:userId", this._authMiddleware.isUserAuthenticate, this.catch(this._userController.deleteUserController));
    }
}
exports.UserRouter = UserRouter;
//# sourceMappingURL=user.router.js.map