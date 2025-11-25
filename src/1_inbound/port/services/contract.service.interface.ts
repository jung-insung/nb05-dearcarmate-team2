import {
  UpdateContractReq,
  UpdateContractStatusReq,
} from "../../requests/contract-schema.request";
import {
  ContractListResponseDto,
  ContractResponseDto,
} from "../../responses/contract/contract.response";

export interface ContractListQueryDto {
  page: number;
  pageSize: number;
  keyword?: string;
  searchBy?: "customerName" | "userName";
}

export interface DropdownItemDto {
  id: number;
  data: string;
}

export interface IContractService {
  updateContractStatus(params: {
    contractId: number;
    dto: UpdateContractStatusReq;
  }): Promise<ContractResponseDto>;
  updateContractDetail(params: {
    contractId: number;
    dto: UpdateContractReq;
  }): Promise<ContractResponseDto>;
  getContractLists(
    userId: number,
    query: ContractListQueryDto,
  ): Promise<ContractListResponseDto>;
  getContractCars(userId: number): Promise<DropdownItemDto[]>;
  getContractCustomers(userId: number): Promise<DropdownItemDto[]>;
  getContractUsers(userId: number): Promise<DropdownItemDto[]>;
}
