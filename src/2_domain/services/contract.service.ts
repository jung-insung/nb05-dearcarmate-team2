import {
  IContractService,
  ContractListQueryDto,
  DropdownItemDto,
} from "../../1_inbound/port/services/contract.service.interface";
import { ContractStatus } from "../entities/contract/contract.enum";
import { ContractMapper } from "../../3_outbound/mappers/contract.mapper";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";
import {
  ContractResponseDto,
  ContractListResponseDto,
} from "../../1_inbound/responses/contract/contract.response";
import { ContractEntity } from "../entities/contract/contract.entity";
import { CarEntity } from "../entities/car/car.entity";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import {
  CreateContractReq,
  UpdateContractReq,
  UpdateContractStatusReq,
} from "../../1_inbound/requests/contract-schema.request";

export class ContractService extends BaseService implements IContractService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  async updateContractStatus(params: {
    contractId: number;
    dto: UpdateContractStatusReq;
  }) {
    return await this._unitOfWork.do(
      async (txRepos) => {
        const entity = await txRepos.contract.findById(params.contractId);

        if (!entity) {
          throw new BusinessException({
            type: BusinessExceptionType.CONTRACT_NOT_EXIST,
          });
        }

        const car = await txRepos.car.findById({
          companyId: entity.companyId,
          carId: entity.carId,
        });

        if (!car) {
          throw new BusinessException({
            type: BusinessExceptionType.CAR_NOT_EXIST,
          });
        }

        const statusKey = params.dto.body.status;
        const newContractStatus =
          ContractStatus[statusKey as keyof typeof ContractStatus];
        let updatedCar;

        switch (newContractStatus) {
          case ContractStatus.CONTRACT_SUCCESSFUL:
            updatedCar = CarEntity.update(car, {
              status: "CONTRACT_COMPLETED",
            });
            break;
          case ContractStatus.CONTRACT_FAILED:
            updatedCar = CarEntity.update(car, {
              status: "POSSESSION",
            });
            break;
          default:
            updatedCar = CarEntity.update(car, {
              status: "CONTRACT_PROCEEDING",
            });
            break;
        }

        try {
          const updated = await txRepos.contract.updateStatus(
            params.contractId,
            newContractStatus,
            entity.version,
          );

          await txRepos.car.update(updatedCar);

          return new ContractResponseDto(ContractMapper.toResponse(updated));
        } catch (err) {
          if (
            err instanceof TechnicalException &&
            err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED
          ) {
            throw new BusinessException({
              type: BusinessExceptionType.CONTRACT_STATUS_CHANGED,
            });
          }
          throw err;
        }
      },
      true,
      true,
    );
  }

  async updateContractDetail(params: {
    contractId: number;
    dto: UpdateContractReq;
  }) {
    return await this._unitOfWork.do(
      async (txRepos) => {
        const entity = await txRepos.contract.findById(params.contractId);
        if (!entity) {
          throw new BusinessException({
            type: BusinessExceptionType.CONTRACT_NOT_EXIST,
          });
        }

        const { status: statusKey, ...restBody } = params.dto.body;

        const statusEnum = statusKey
          ? ContractStatus[statusKey as keyof typeof ContractStatus]
          : undefined;

        entity.update({
          ...restBody,
          status: statusEnum,
        });

        if (statusEnum) {
          const car = await txRepos.car.findById({
            companyId: entity.companyId,
            carId: entity.carId,
          });

          if (!car) {
            throw new BusinessException({
              type: BusinessExceptionType.CAR_NOT_EXIST,
            });
          }

          let updatedCar;

          switch (statusEnum) {
            case ContractStatus.CONTRACT_SUCCESSFUL:
              updatedCar = CarEntity.update(car, {
                status: "CONTRACT_COMPLETED",
              });
              break;
            case ContractStatus.CONTRACT_FAILED:
              updatedCar = CarEntity.update(car, {
                status: "POSSESSION",
              });
              break;
            default:
              updatedCar = CarEntity.update(car, {
                status: "CONTRACT_PROCEEDING",
              });
              break;
          }
          await txRepos.car.update(updatedCar);
        }

        try {
          const updated = await txRepos.contract.update(
            params.contractId,
            entity,
          );
          return new ContractResponseDto(ContractMapper.toResponse(updated));
        } catch (err) {
          if (
            err instanceof TechnicalException &&
            err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED
          ) {
            throw new BusinessException({
              type: BusinessExceptionType.CONTRACT_DATA_CHANGED,
            });
          }
          throw err;
        }
      },
      true,
      true,
    );
  }

  async getContractLists(
    userId: number,
    query: ContractListQueryDto,
  ): Promise<ContractListResponseDto> {
    const companyId = await this._getCompanyId(userId);
    const { page, pageSize, keyword, searchBy } = query;

    const allStatuses = Object.values(ContractStatus);
    const response: ContractListResponseDto = {};

    for (const status of allStatuses) {
      const { contracts, totalItemCount } =
        await this._unitOfWork.repos.contract.findAll({
          offset: (page - 1) * pageSize,
          limit: pageSize,
          keyword,
          searchBy,
          companyId,
          status,
        });

      response[status] = {
        totalItemCount,
        data: contracts.map(
          (c) => new ContractResponseDto(ContractMapper.toResponse(c)),
        ),
      };
    }

    return response;
  }

  async getContractCars(userId: number): Promise<DropdownItemDto[]> {
    const companyId = await this._getCompanyId(userId);
    const { items } = await this._unitOfWork.repos.car.findMany({
      companyId,
      page: 1,
      pageSize: 1000,
      status: "POSSESSION",
    });
    return items.map((car) => ({
      id: car.id!,
      data: `${car.model}(${car.carNumber})`,
    }));
  }

  async getContractCustomers(userId: number): Promise<DropdownItemDto[]> {
    const companyId = await this._getCompanyId(userId);
    const { data } = await this._unitOfWork.repos.customer.findAll({
      companyId,
      page: 1,
      pageSize: 1000,
    });
    return data.map((customer) => ({
      id: customer.id,
      data: `${customer.name}(${customer.email})`,
    }));
  }

  async getContractUsers(userId: number): Promise<DropdownItemDto[]> {
    const companyId = await this._getCompanyId(userId);
    const users =
      await this._unitOfWork.repos.user.findAllByCompanyId(companyId);
    return users.map((user) => ({
      id: user.id!,
      data: `${user.name}(${user.email})`,
    }));
  }

  async createContract(params: { userId: number; dto: CreateContractReq }) {
    const { userId, dto } = params;

    return this._unitOfWork.do(
      async (txRepos) => {
        // 유저 확인
        const user = await txRepos.user.findUserById(userId);
        if (!user) {
          throw new BusinessException({
            type: BusinessExceptionType.USER_NOT_EXIST,
          });
        }
        const companyId = user.companyId;

        // 차량 확인
        const car = await txRepos.car.findById({
          companyId,
          carId: dto.carId,
        });
        if (!car) {
          throw new BusinessException({
            type: BusinessExceptionType.CAR_NOT_EXIST,
          });
        }
        if ((car.status as string) !== "POSSESSION") {
          throw new BusinessException({
            type: BusinessExceptionType.BAD_REQUEST,
          });
        }

        // 고객 확인
        const customer = await txRepos.customer.findById(dto.customerId);
        if (!customer) {
          throw new BusinessException({
            type: BusinessExceptionType.CUSTOMER_NOT_EXIST,
          });
        }

        const newContract = ContractEntity.createNew({
          userId,
          carId: dto.carId,
          customerId: dto.customerId,
          companyId,
          contractPrice: 0,
          meetings: dto.meetings,
        });

        const created = await txRepos.contract.create(newContract);

        const updatedCar = CarEntity.update(car, {
          status: "CONTRACT_PROCEEDING",
        });

        await txRepos.car.update(updatedCar);
        await txRepos.customer.increaseContractCount(customer.id);

        return ContractMapper.toResponse(created, {
          user: { id: user.id, name: user.name },
          customer: { id: customer.id, name: customer.name },
          car: { id: car.id!, model: car.model },
        });
      },
      true,
      true,
    );
  }

  async deleteContract(params: {
    userId: number;
    contractId: number;
  }): Promise<void> {
    const { userId, contractId } = params;

    await this._unitOfWork.do(
      async (repos) => {
        const contract = await repos.contract.findById(contractId);
        if (!contract) {
          throw new BusinessException({
            type: BusinessExceptionType.CONTRACT_NOT_EXIST,
          });
        }

        const userCompanyId = await this._getCompanyId(userId);
        if (contract.companyId !== userCompanyId) {
          throw new BusinessException({
            type: BusinessExceptionType.NOT_FOUND,
          });
        }

        const car = await repos.car.findById({
          companyId: contract.companyId,
          carId: contract.carId,
        });

        if (car) {
          const updatedCar = CarEntity.update(car, {
            status: "POSSESSION",
          });
          await repos.car.update(updatedCar);
        }

        await repos.contract.delete(contractId);
        await repos.customer.decreaseContractCount(contract.customerId);
      },
      true,
      true,
    );
  }
}
