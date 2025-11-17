import { CarEntity } from "../../entities/car/car.entity";

export interface ICarRepo {
  create(car: CarEntity): Promise<CarEntity>;
  findById(params: {
    companyId: number;
    carId: number;
  }): Promise<CarEntity | null>;

  findMany(params: {
    companyId: number;
    page: number;
    pageSize: number;
    status?: string;
    searchBy?: "carNumber" | "model";
    keyword?: string;
  }): Promise<{
    items: CarEntity[];
    totalItemCount: number;
  }>;

  update(car: CarEntity): Promise<CarEntity>;
  delete(params: { companyId: number; carId: number }): Promise<void>;
}
