"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const base_router_1 = require("./base.router");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
class CustomerRouter extends base_router_1.BaseRouter {
    constructor(_customerController, _authMiddleware) {
        super("/customers");
        this._customerController = _customerController;
        this._authMiddleware = _authMiddleware;
        this.registCustomerRouter();
    }
    registCustomerRouter() {
        this.router.post("/", this._authMiddleware.isUserAuthenticate, this.catch(this._customerController.registCustomer));
        this.router.get("/", this._authMiddleware.isUserAuthenticate, this.catch(this._customerController.getCustomers));
        this.router.patch("/:customerId", this._authMiddleware.isUserAuthenticate, this.catch(this._customerController.updateCustomer));
        this.router.delete("/:customerId", this._authMiddleware.isUserAuthenticate, this.catch(this._customerController.deleteCusomer));
        this.router.get("/:customerId", this._authMiddleware.isUserAuthenticate, this.catch(this._customerController.getCustomer));
        this.router.post("/upload", upload.single("file"), this._authMiddleware.isUserAuthenticate, this.catch(this._customerController.uploadCustomers));
    }
}
exports.CustomerRouter = CustomerRouter;
//# sourceMappingURL=coustomer.router.js.map