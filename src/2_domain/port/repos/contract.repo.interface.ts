import { ContractDocViewReturn } from "../../../3_outbound/repos/contract.repo";
import { ContractDocPagination } from "../../services/contractDoc.service";
import { ContractStatus } from "../../entities/contract/contract.enum";
import {
  ContractEntity,
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
  findById(id: number): Promise<ContractEntity>;
  update(id: number, entity: ContractEntity): Promise<ContractEntity>;
  findAll(
    query: ContractListRepoDto,
  ): Promise<{ contracts: PersistContractEntity[]; totalItemCount: number }>;

  getContractsForDocView(
    pagination: ContractDocPagination,
  ): Promise<ContractDocViewReturn>;
}
