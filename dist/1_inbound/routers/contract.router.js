"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractRouter = void 0;
const base_router_1 = require("./base.router");
class ContractRouter extends base_router_1.BaseRouter {
    constructor(_contractController, _authMiddleware) {
        super("/contracts");
        this._contractController = _contractController;
        this._authMiddleware = _authMiddleware;
        this.registercontractRouter();
    }
    registercontractRouter() {
        this.router.get("/", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.getContractLists));
        this.router.get("/cars", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.getContractCars));
        this.router.get("/customers", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.getContractCustomers));
        this.router.get("/users", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.getContractUsers));
        this.router.post("/", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.createContract));
        this.router.patch("/:id", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.updateContract));
        this.router.delete("/:contractId", this._authMiddleware.isUserAuthenticate, this.catch(this._contractController.deleteContract));
    }
}
exports.ContractRouter = ContractRouter;
//# sourceMappingURL=contract.router.js.map