import { BaseRouter } from "./base.router";
import { CarController } from "../controllers/car.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";

const uploader = new FileUploadMiddleware();

export class CarRouter extends BaseRouter {
  constructor(
    private readonly _carController: CarController,
    private readonly _authMiddleware: AuthMiddleware,
  ) {
    super("/cars");
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._carController.registerCar),
    );
    this.router.get(
      "/models",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._carController.getCarModels),
    );
    // 업로드
    this.router.post(
      "/upload",
      uploader.upload.single("file"),
      this._authMiddleware.isUserAuthenticate,
      uploader.csvUploadHandler,
      this.catch(this._carController.uploadCars),
    );

    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._carController.getCars),
    );
    this.router.get(
      "/:carId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._carController.getCar),
    );
    this.router.patch(
      "/:carId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._carController.updateCar),
    );
    this.router.delete(
      "/:carId",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._carController.deleteCar),
    );
  }
}
