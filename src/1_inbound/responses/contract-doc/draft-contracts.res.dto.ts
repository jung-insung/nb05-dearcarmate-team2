import { ContractDocViewEntity } from "../../../2_domain/entities/cotract-doc/contract-doc-view.entity";

export class DraftcontractsResDto {
  constructor(draftContracts: ContractDocViewEntity[]) {
    draftContracts.map((contract) => ({
      id: contract.id,
      data: contract.contractName,
    }));
  }
}
