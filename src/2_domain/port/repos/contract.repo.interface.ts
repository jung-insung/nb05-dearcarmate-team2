import { ContractDocViewReturn, SuccessfulContractAggregates } from "../../../3_outbound/repos/contract.repo";
import { ContractDocPagination } from "../../services/contract-doc.service";
import { ContractStatus } from "../../entities/contract/contract.enum";
import {
  ContractEntity,
  PersistContractEntity,
} from "../../entities/contract/contract.entity";
import { ContractDocViewEntity } from "../../entities/cotract-doc/contract-doc-view.entity";

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

  updateStatus(
    id: number,
    status: ContractStatus,
    version: number,
  ): Promise<ContractEntity>;

  update(id: number, entity: ContractEntity): Promise<ContractEntity>;

  findAll(
    query: ContractListRepoDto,
  ): Promise<{ contracts: PersistContractEntity[]; totalItemCount: number }>;

  getContractsForDocView(
    pagination: ContractDocPagination,
  ): Promise<ContractDocViewReturn>;

  create(entity: ContractEntity): Promise<ContractEntity>;

  getContractsForDocView(
    pagination: ContractDocPagination,
  ): Promise<ContractDocViewReturn>;

  getDraftContracts(): Promise<ContractDocViewEntity[]>;

  delete(id: number): Promise<void>;

  getMonthlySalesAggregates(month: string): Promise<number>;

  getSuccessfulContractAggregates(): Promise<SuccessfulContractAggregates>;

  getProceedingContractAggregate() : Promise<number>;
}
