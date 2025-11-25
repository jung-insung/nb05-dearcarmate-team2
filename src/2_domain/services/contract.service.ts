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
import { PersistContractEn } from "../entities/contract/contract.entity.util";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import {
  UpdateContractReq,
  UpdateContractStatusReq,
} from "../../1_inbound/requests/contract-schema.request";

export class ContractService extends BaseService implements IContractService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  private async _executeContractUpdate(
    contractId: number,
    dto: any,
    conflictExceptionType: BusinessExceptionType,
  ) {
    return await this._unitOfWork.do(
      async (txRepos) => {
        const entity = await txRepos.contract.findById(contractId);

        if (!entity) {
          throw new BusinessException({
            type: BusinessExceptionType.CONTRACT_NOT_EXIST,
          });
        }

        entity.update(dto);

        try {
          const updated = await txRepos.contract.update(contractId, entity);
          return ContractMapper.toResponse(updated);
        } catch (err) {
          if (
            err instanceof TechnicalException &&
            err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED
          ) {
            throw new BusinessException({ type: conflictExceptionType });
          }
          throw err;
        }
      },
      true,
      false,
    );
  }

  async updateContractStatus(params: {
    contractId: number;
    dto: UpdateContractStatusReq;
  }) {
    return this._executeContractUpdate(
      params.contractId,
      params.dto,
      BusinessExceptionType.CONTRACT_STATUS_CHANGED,
    );
  }

  async updateContractDetail(params: {
    contractId: number;
    dto: UpdateContractReq;
  }) {
    return this._executeContractUpdate(
      params.contractId,
      params.dto,
      BusinessExceptionType.CONTRACT_DATA_CHANGED,
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
    const users = await this._unitOfWork.repos.user.findAllByCompanyId(companyId);
    return users.map((user) => ({
      id: user.id!,
      data: `${user.name}(${user.email})`,
    }));
  }
}
