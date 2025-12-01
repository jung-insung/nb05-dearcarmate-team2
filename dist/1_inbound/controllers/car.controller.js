"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const base_controller_1 = require("./base.controller");
const car_res_dto_1 = require("../responses/car.res.dto");
const car_schema_request_1 = require("../requests/car-schema.request");
class CarController extends base_controller_1.BaseController {
    constructor(_carService) {
        super();
        this._carService = _carService;
        this.registerCar = async (req, res) => {
            const body = this.validateOrThrow(car_schema_request_1.registerCarSchema, req.body);
            const entity = await this._carService.registerCar({
                body,
                userId: req.userId,
            });
            return res.status(201).json(new car_res_dto_1.CarResDto(entity));
        };
        this.getCars = async (req, res) => {
            const page = Number(req.query.page ?? 1);
            const pageSize = Number(req.query.pageSize ?? 10);
            const rawKeyword = req.query.keyword;
            const cleanedKeyword = (rawKeyword ?? "").replace(/\s+/g, "");
            const result = await this._carService.getCars({
                userId: req.userId,
                page,
                pageSize,
                status: req.query.status,
                searchBy: req.query.searchBy,
                keyword: cleanedKeyword,
            });
            return res.json(new car_res_dto_1.CarListResDto(result));
        };
        this.getCar = async (req, res) => {
            const carId = Number(req.params.carId);
            const entity = await this._carService.getCar({
                userId: req.userId,
                carId,
            });
            return res.json(new car_res_dto_1.CarResDto(entity));
        };
        this.updateCar = async (req, res) => {
            const body = this.validateOrThrow(car_schema_request_1.updateCarSchema, req.body);
            const carId = Number(req.params.carId);
            const entity = await this._carService.updateCar({
                body,
                userId: req.userId,
                carId,
            });
            return res.json(new car_res_dto_1.CarResDto(entity));
        };
        this.deleteCar = async (req, res) => {
            const carId = Number(req.params.carId);
            await this._carService.deleteCar({
                userId: req.userId,
                carId,
            });
            return res.json({ message: "차량 삭제 성공" });
        };
        this.getCarModels = async (req, res) => {
            const data = await this._carService.getCarModels();
            return res.json({ data });
        };
        this.uploadCars = async (req, res) => {
            await this._carService.uploadCars({
                userId: req.userId,
                req,
            });
            return res.json({ message: "성공적으로 등록되었습니다" });
        };
    }
}
exports.CarController = CarController;
//# sourceMappingURL=car.controller.js.map