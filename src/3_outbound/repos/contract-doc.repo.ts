import { IContractDocRepo as IContractDocRepo } from "../../2_domain/port/repos/contract-doc.repo.interface";
import { ContractDocPagination } from "../../2_domain/services/contractDoc.service";
import { BasePrismaClient, BaseRepo } from "./base.repo";

export class ContractDocRepo extends BaseRepo implements IContractDocRepo{
  constructor(prisma: BasePrismaClient) {
    super(prisma);
  }

}