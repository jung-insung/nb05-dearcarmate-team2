import { CarEntity } from "../../2_domain/entities/car/car.entity";
import { CarMapper } from "../../3_outbound/mappers/car.mapper";

export class CarResDto {
  id!: number;
  carNumber!: string;
  manufacturer!: string;
  model!: string;
  type!: string;
  manufacturingYear!: number;
  mileage!: number;
  price!: number;
  accidentCount!: number;
  explanation!: string | null;
  accidentDetails!: string | null;
  status!: string;

  constructor(entity: CarEntity) {
    const r = CarMapper.toResponse(entity);
    Object.assign(this, r);
  }
}

export class CarListResDto {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: CarResDto[];

  constructor(params: {
    currentPage: number;
    totalPages: number;
    totalItemCount: number;
    items: CarEntity[];
  }) {
    this.currentPage = params.currentPage;
    this.totalPages = params.totalPages;
    this.totalItemCount = params.totalItemCount;
    this.data = params.items.map((i) => new CarResDto(i));
  }
}
