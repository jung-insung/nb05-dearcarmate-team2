import { BaseRouter } from "./base.router";
import { CarController } from "../controllers/car.controller";
import multer from "multer";

const upload = multer();

export class CarRouter extends BaseRouter {
  constructor(private readonly _carController: CarController) {
    super("/cars");
    this.setRoutes();
  }

  private setRoutes() {
    this.router.post("", this.catch(this._carController.registerCar));
    this.router.get("", this.catch(this._carController.getCars));
    this.router.get("/:carId", this.catch(this._carController.getCar));
    this.router.patch("/:carId", this.catch(this._carController.updateCar));
    this.router.delete("/:carId", this.catch(this._carController.deleteCar));
    this.router.get("/models", this.catch(this._carController.getCarModels));

    // 업로드
    this.router.post(
      "/upload",
      upload.single("file"),
      this.catch(this._carController.uploadCars),
    );
  }
}
