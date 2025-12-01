"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRouter = void 0;
const base_router_1 = require("./base.router");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
class CarRouter extends base_router_1.BaseRouter {
    constructor(_carController, _authMiddleware) {
        super("/cars");
        this._carController = _carController;
        this._authMiddleware = _authMiddleware;
        this.setRoutes();
    }
    setRoutes() {
        this.router.post("", this._authMiddleware.isUserAuthenticate, this.catch(this._carController.registerCar));
        this.router.get("/models", this._authMiddleware.isUserAuthenticate, this.catch(this._carController.getCarModels));
        // 업로드
        this.router.post("/upload", upload.single("file"), this._authMiddleware.isUserAuthenticate, this.catch(this._carController.uploadCars));
        this.router.get("", this._authMiddleware.isUserAuthenticate, this.catch(this._carController.getCars));
        this.router.get("/:carId", this._authMiddleware.isUserAuthenticate, this.catch(this._carController.getCar));
        this.router.patch("/:carId", this._authMiddleware.isUserAuthenticate, this.catch(this._carController.updateCar));
        this.router.delete("/:carId", this._authMiddleware.isUserAuthenticate, this.catch(this._carController.deleteCar));
    }
}
exports.CarRouter = CarRouter;
//# sourceMappingURL=car.router.js.map