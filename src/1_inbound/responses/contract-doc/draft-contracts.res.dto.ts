import { ContractDocViewEntity } from "../../../2_domain/entities/cotract-doc/contract-doc-view.entity";

export class DraftcontractsResDto {
  public drafts: { id: number; data: string }[];

  constructor(draftContracts: ContractDocViewEntity[]) {
    this.drafts = draftContracts.map((contract) => ({
      id: contract.id,
      data: contract.contractName,
    }));
  }
}
