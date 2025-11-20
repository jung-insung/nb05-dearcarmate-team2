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
import { CarCsvUtil } from "../../4_shared/utils/car-csv.util";

export class CarService implements ICarService {
  constructor(private readonly _unitOfWork: IUnitOfWork) {}

  private async _getCompanyId(userId: number) {
    const user = await this._unitOfWork.repos.user.findUserById(userId);

    if (!user) {
      throw new BusinessException({
        type: BusinessExceptionType.USER_NOT_EXIST,
      });
    }

    if (!user.companyId) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
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
        type: BusinessExceptionType.CAR_NOT_EXIST,
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
        type: BusinessExceptionType.CAR_NOT_EXIST,
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
        type: BusinessExceptionType.CAR_NOT_EXIST,
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
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_FILE_NOT_UPLOADED,
      });
    }

    // multer 메모리 스토리지를 사용하므로 buffer 사용
    const content = file.buffer?.toString("utf-8");

    if (!content) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_FILE_EMPTY,
      });
    }

    const rows = CarCsvUtil.parse(content);

    if (rows.length === 0) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
      });
    }

    await this._unitOfWork.do(async (txRepos) => {
      for (const row of rows) {
        const entity = CarMapper.toCreateEntity({
          ...row,
          companyId,
        });
        await txRepos.car.create(entity);
      }
    }, false);
  }
}
