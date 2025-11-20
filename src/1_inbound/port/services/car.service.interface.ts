import { CarEntity } from "../../../2_domain/entities/car/car.entity";
import {
  RegisterCarReq,
  UpdateCarReq,
} from "../../requests/car-schema.request";

export interface ICarService {
  registerCar(params: {
    body: RegisterCarReq;
    userId: number;
  }): Promise<CarEntity>;

  getCars(params: {
    userId: number;
    page: number;
    pageSize: number;
    status?: string;
    searchBy?: "carNumber" | "model";
    keyword?: string;
  }): Promise<{
    currentPage: number;
    totalPages: number;
    totalItemCount: number;
    items: CarEntity[];
  }>;

  getCar(params: { userId: number; carId: number }): Promise<CarEntity>;

  updateCar(params: {
    body: UpdateCarReq;
    userId: number;
    carId: number;
  }): Promise<CarEntity>;

  deleteCar(params: { userId: number; carId: number }): Promise<void>;

  uploadCars(params: { userId: number; req: any }): Promise<void>;
}
