import { Request, Response } from "express";
import { BaseController } from "./base.controller";

import { ICarService } from "../port/services/car.service.interface";
import { CarResDto, CarListResDto } from "../responses/car.res.dto";
import { carFieldExceptionMap } from "../requests/validater-map";
import {
  registerCarSchema,
  updateCarSchema,
} from "../requests/car-schema.request";

export class CarController extends BaseController {
  constructor(private readonly _carService: ICarService) {
    super();
  }

  registerCar = async (req: Request, res: Response) => {
    const body = this.validateOrThrow(registerCarSchema, req.body);

    const entity = await this._carService.registerCar({
      body,
      userId: req.userId!,
    });
    return res.status(201).json(new CarResDto(entity));
  };

  getCars = async (req: Request, res: Response) => {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 10);

    const result = await this._carService.getCars({
      userId: req.userId!,
      page,
      pageSize,
      status: req.query.status as string,
      searchBy: req.query.searchBy as any,
      keyword: req.query.keyword as string,
    });

    return res.json(new CarListResDto(result));
  };

  getCar = async (req: Request, res: Response) => {
    const carId = Number(req.params.carId);

    const entity = await this._carService.getCar({
      userId: req.userId!,
      carId,
    });

    return res.json(new CarResDto(entity));
  };

  updateCar = async (req: Request, res: Response) => {
    const body = this.validateOrThrow(updateCarSchema, req.body);
    const carId = Number(req.params.carId);

    const entity = await this._carService.updateCar({
      body,
      userId: req.userId!,
      carId,
    });

    return res.json(new CarResDto(entity));
  };

  deleteCar = async (req: Request, res: Response) => {
    const carId = Number(req.params.carId);

    await this._carService.deleteCar({
      userId: req.userId!,
      carId,
    });

    return res.json({ message: "차량 삭제 성공" });
  };
  getCarModels = async (req: Request, res: Response) => {
    const data = await this._carService.getCarModels();
    return res.json({ data });
  };

  uploadCars = async (req: Request, res: Response) => {
    await this._carService.uploadCars({
      userId: req.userId!,
      req,
    });

    return res.json({ message: "성공적으로 등록되었습니다" });
  };
}
