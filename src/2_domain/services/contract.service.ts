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

export class ContractService extends BaseService implements IContractService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  async getContracts(
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
    const me = await this._unitOfWork.repos.user.findUserById(userId);
    return me ? [{ id: me.id, data: `${me.name}(${me.email})` }] : [];
  }
}
