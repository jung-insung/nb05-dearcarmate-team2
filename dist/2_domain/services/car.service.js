"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const client_1 = require("@prisma/client");
const car_mapper_1 = require("../../3_outbound/mappers/car.mapper");
const car_csv_util_1 = require("../../4_shared/utils/car-csv.util");
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const base_service_1 = require("./base.service");
class CarService extends base_service_1.BaseService {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    // 중복 차량번호 검사 공통 함수
    async _ensureCarNumberNotExists(carNumber, companyId) {
        const exists = await this._unitOfWork.repos.car.findByCarNumber(carNumber, companyId);
        if (exists) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.DUPLICATE_CAR_NUMBER,
            });
        }
    }
    // 차량 등록
    async registerCar(params) {
        const { body, userId } = params;
        const companyId = await this._getCompanyId(userId);
        await this._ensureCarNumberNotExists(body.carNumber, companyId);
        const entity = car_mapper_1.CarMapper.toCreateEntity({ ...body, companyId });
        return await this._unitOfWork.repos.car.create(entity);
    }
    // 리스트 조회
    async getCars(params) {
        const { userId, page, pageSize, status, searchBy, keyword } = params;
        const companyId = await this._getCompanyId(userId);
        const mappedStatus = status === "possession"
            ? client_1.CarStatus.POSSESSION
            : status === "contractProceeding"
                ? client_1.CarStatus.CONTRACT_PROCEEDING
                : status === "contractCompleted"
                    ? client_1.CarStatus.CONTRACT_COMPLETED
                    : undefined;
        const { items, totalItemCount } = await this._unitOfWork.repos.car.findMany({
            companyId,
            page,
            pageSize,
            status: mappedStatus,
            searchBy,
            keyword,
        });
        return {
            currentPage: page,
            totalPages: Math.ceil(totalItemCount / pageSize),
            totalItemCount,
            items,
        };
    }
    // 단일 조회
    async getCar(params) {
        const { userId, carId } = params;
        const companyId = await this._getCompanyId(userId);
        const car = await this._unitOfWork.repos.car.findById({ companyId, carId });
        if (!car) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_NOT_EXIST,
            });
        }
        return car;
    }
    // 차량 수정
    async updateCar(params) {
        const { body, userId, carId } = params;
        const companyId = await this._getCompanyId(userId);
        const existing = await this._unitOfWork.repos.car.findById({
            companyId,
            carId,
        });
        if (!existing) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_NOT_EXIST,
            });
        }
        // 차량번호 변경 시 중복 검사
        if (body.carNumber && body.carNumber !== existing.carNumber) {
            await this._ensureCarNumberNotExists(body.carNumber, companyId);
        }
        const updated = car_mapper_1.CarMapper.toUpdateEntity(existing, body);
        return await this._unitOfWork.repos.car.update(updated);
    }
    // 삭제
    async deleteCar(params) {
        const { userId, carId } = params;
        const companyId = await this._getCompanyId(userId);
        const existing = await this._unitOfWork.repos.car.findById({
            companyId,
            carId,
        });
        if (!existing) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_NOT_EXIST,
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
            {
                manufacturer: "현대",
                model: ["그랜저", "아반떼", "소나타", "투싼", "베뉴"],
            },
            { manufacturer: "쉐보레", model: ["스파크", "말리부", "트랙스"] },
        ];
    }
    // CSV 업로드
    async uploadCars(params) {
        const { userId, req } = params;
        const companyId = await this._getCompanyId(userId);
        const file = req.file;
        if (!file) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_FILE_NOT_UPLOADED,
            });
        }
        const content = file.buffer?.toString("utf-8");
        if (!content) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_FILE_EMPTY,
            });
        }
        const rows = car_csv_util_1.CarCsvUtil.parse(content);
        await this._unitOfWork.do(async (txRepos) => {
            for (const row of rows) {
                await this._ensureCarNumberNotExists(row.carNumber, companyId);
                const entity = car_mapper_1.CarMapper.toCreateEntity({
                    ...row,
                    companyId,
                });
                await txRepos.car.create(entity);
            }
        }, false);
    }
}
exports.CarService = CarService;
//# sourceMappingURL=car.service.js.map