import { ContractDocViewEntity } from "../../2_domain/entities/cotract-doc/contract-doc-view.entity";
import { NewContractDocEntity } from "../../2_domain/entities/cotract-doc/contract-doc.entity";
import { ContractDBForDocView } from "../repos/contract.repo";

export type CreateContractDocData = {
  id: number;
};
export class ContractDocMapper {
  static toCreateData(entity: NewContractDocEntity) {}

  static toContractDocViewEntity(
    record: ContractDBForDocView,
  ): ContractDocViewEntity {
    return new ContractDocViewEntity({
      contractId: record.id,
      contractName: `${record.car.model} - ${record.customer.name}`,
      resolutionDate: record.resolutionDate,
      documentCount: record.documents.length,
      userName: record.user.name,
      carNumber: record.car.carNumber,
      documents: record.documents,
    });
  }
}
