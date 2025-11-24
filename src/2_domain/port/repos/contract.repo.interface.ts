import { ContractStatus } from "../../entities/contract/contract.enum";
import {
  PersistContractEntity,
} from "../../entities/contract/contract.entity";

export type LockType = "share" | "beta";

export interface ContractListRepoDto {
  offset: number;
  limit: number;
  keyword?: string;
  searchBy?: "customerName" | "userName";
  companyId: number;
  status?: ContractStatus;
}

export interface IContractRepo {
  findAll(
    query: ContractListRepoDto,
  ): Promise<{ contracts: PersistContractEntity[]; totalItemCount: number }>;
}
