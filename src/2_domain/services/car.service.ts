import { CarStatus } from "@prisma/client";
import {
  RegisterCarReq,
  UpdateCarReq,
} from "../../1_inbound/requests/car-schema.request";
import { CarEntity } from "../entities/car/car.entity";
import { CarMapper } from "../../3_outbound/mappers/car.mapper";
import { CarCsvUtil } from "../../4_shared/utils/car-csv.util";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { ICarService } from "../../1_inbound/port/services/car.service.interface";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { BaseService } from "./base.service";

export class CarService extends BaseService implements ICarService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  // 중복 차량번호 검사 공통 함수
  private async _ensureCarNumberNotExists(carNumber: string, companyId: number) {
    const exists = await this._unitOfWork.repos.car.findByCarNumber(
      carNumber,
      companyId,
    );

    if (exists) {
      throw new BusinessException({
        type: BusinessExceptionType.DUPLICATE_CAR_NUMBER,
      });
    }
  }

  // 차량 등록
  async registerCar(params: {
    body: RegisterCarReq;
    userId: number;
  }): Promise<CarEntity> {
    const { body, userId } = params;
    const companyId = await this._getCompanyId(userId);

    await this._ensureCarNumberNotExists(body.carNumber, companyId);

    const entity = CarMapper.toCreateEntity({ ...body, companyId });
    return await this._unitOfWork.repos.car.create(entity);
  }

  // 리스트 조회
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

  // 단일 조회
  async getCar(params: { userId: number; carId: number }): Promise<CarEntity> {
    const { userId, carId } = params;
    const companyId = await this._getCompanyId(userId);

    const car = await this._unitOfWork.repos.car.findById({ companyId, carId });
    if (!car) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_NOT_EXIST,
      });
    }

    return car;
  }

  // 차량 수정
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

    // 차량번호 변경 시 중복 검사
    if (body.carNumber && body.carNumber !== existing.carNumber) {
      await this._ensureCarNumberNotExists(body.carNumber, companyId);
    }

    const updated = CarMapper.toUpdateEntity(existing, body);
    return await this._unitOfWork.repos.car.update(updated);
  }

  // 삭제
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

  // 모델 목록
  async getCarModels() {
    return [
      { manufacturer: "기아", model: ["K3", "K5", "K7", "K9", "K8"] },
      { manufacturer: "현대", model: ["그랜저", "아반떼", "소나타", "투싼", "베뉴"] },
      { manufacturer: "쉐보레", model: ["스파크", "말리부", "트랙스"] },
    ];
  }

  // CSV 업로드
  async uploadCars(params: { userId: number; req: any }): Promise<void> {
    const { userId, req } = params;
    const companyId = await this._getCompanyId(userId);

    const file = req.file;
    if (!file) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_FILE_NOT_UPLOADED,
      });
    }

    const content = file.buffer?.toString("utf-8");
    if (!content) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_FILE_EMPTY,
      });
    }

    const rows = CarCsvUtil.parse(content);

    await this._unitOfWork.do(async (txRepos) => {
      for (const row of rows) {
        await this._ensureCarNumberNotExists(row.carNumber, companyId);

        const entity = CarMapper.toCreateEntity({
          ...row,
          companyId,
        });

        await txRepos.car.create(entity);
      }
    }, false);
  }
}
