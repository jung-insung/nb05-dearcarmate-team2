import { CarStatus } from "@prisma/client";
import {
  RegisterCarReq,
  UpdateCarReq,
} from "../../1_inbound/requests/car-schema.request";
import { CarEntity } from "../entities/car/car.entity";
import { CarMapper } from "../../3_outbound/mappers/car.mapper";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { ICarService } from "../../1_inbound/port/services/car.service.interface";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

export class CarService implements ICarService {
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  private async _getCompanyId(userId: number) {
    const user = await this._unitOfWork.repos.user.findUserById(userId);

    if (!user) {
      throw new BusinessException({
        type: BusinessExceptionType.NOT_FOUND,
        message: "존재하지 않는 사용자입니다.",
      });
    }

    if (!user.companyId) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
        message: "사용자에 소속된 회사 정보를 찾을 수 없습니다.",
      });
    }

    return user.companyId;
  }

  async registerCar(params: {
    body: RegisterCarReq;
    userId: number;
  }): Promise<CarEntity> {
    const { body, userId } = params;

    const companyId = await this._getCompanyId(userId);

    const entity = CarMapper.toCreateEntity({
      ...body,
      companyId,
    });

    return await this._unitOfWork.repos.car.create(entity);
  }

  async getCars(params: {
    userId: number;
    page: number;
    pageSize: number;
    status?: string;
    searchBy?: "carNumber" | "model";
    keyword?: string;
  }) {
    const { userId, page, pageSize, status, searchBy, keyword } = params;

    const companyId = await this._getCompanyId(userId);

    const mappedStatus =
      status === "possession"
        ? CarStatus.POSSESSION
        : status === "contractProceeding"
          ? CarStatus.CONTRACT_PROCEEDING
          : status === "contractCompleted"
            ? CarStatus.CONTRACT_COMPLETED
            : undefined;

    const { items, totalItemCount } = await this._unitOfWork.repos.car.findMany(
      {
        companyId,
        page,
        pageSize,
        status: mappedStatus as any,
        searchBy,
        keyword,
      },
    );

    return {
      currentPage: page,
      totalPages: Math.ceil(totalItemCount / pageSize),
      totalItemCount,
      items,
    };
  }

  async getCar(params: { userId: number; carId: number }): Promise<CarEntity> {
    const { userId, carId } = params;

    const companyId = await this._getCompanyId(userId);

    const car = await this._unitOfWork.repos.car.findById({
      companyId,
      carId,
    });

    if (!car) {
      throw new BusinessException({
        type: BusinessExceptionType.NOT_FOUND,
        message: "존재하지 않는 차량입니다.",
      });
    }

    return car;
  }

  async updateCar(params: {
    body: UpdateCarReq;
    userId: number;
    carId: number;
  }): Promise<CarEntity> {
    const { body, userId, carId } = params;

    const companyId = await this._getCompanyId(userId);

    const existing = await this._unitOfWork.repos.car.findById({
      companyId,
      carId,
    });

    if (!existing) {
      throw new BusinessException({
        type: BusinessExceptionType.NOT_FOUND,
        message: "존재하지 않는 차량입니다.",
      });
    }

    const updated = CarMapper.toUpdateEntity(existing, body);

    return await this._unitOfWork.repos.car.update(updated);
  }

  async deleteCar(params: { userId: number; carId: number }): Promise<void> {
    const { userId, carId } = params;

    const companyId = await this._getCompanyId(userId);

    const existing = await this._unitOfWork.repos.car.findById({
      companyId,
      carId,
    });

    if (!existing) {
      throw new BusinessException({
        type: BusinessExceptionType.NOT_FOUND,
        message: "존재하지 않는 차량입니다.",
      });
    }

    await this._unitOfWork.repos.car.delete({
      companyId,
      carId,
    });
  }
  async uploadCars(params: { userId: number; req: any }): Promise<void> {
    const { userId, req } = params;
    const companyId = await this._getCompanyId(userId);

    const file = req.file;
    if (!file) {
      // 파일 없으면 그냥 비즈니스 예외 던지기
      throw new BusinessException({
        type: BusinessExceptionType.INVALID_REQUEST,
        message: "파일이 업로드되지 않았습니다.",
      });
    }
  }
}
