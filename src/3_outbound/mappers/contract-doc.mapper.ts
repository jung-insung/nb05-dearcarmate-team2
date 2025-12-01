import { ContractDocViewEntity } from "../../2_domain/entities/cotract-doc/contract-doc-view.entity";
import {
  ContractDocEntity,
  NewContractDocEntity,
  PersistContractDocEntity,
} from "../../2_domain/entities/cotract-doc/contract-doc.entity";
import { PersistDBContractDoc } from "../repos/contract-doc.repo";
import { ContractDBForDocView } from "../repos/contract.repo";

export type CreateContractDocData = {
  fileName: string;
  filePath: string;
};
export class ContractDocMapper {
  static toCreateData(entity: NewContractDocEntity) {
    return {
      fileName: entity.fileName,
      filePath: entity.filePath,
    };
  }

  static toPersistEntity(
    record: PersistDBContractDoc,
  ): PersistContractDocEntity {
    return new ContractDocEntity({
      id: record.id,
      contractId: record.contractId || undefined,
      fileName: record.fileName,
      filePath: record.filePath,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    }) as PersistContractDocEntity;
  }

  static toContractDocViewEntity(
    record: ContractDBForDocView,
  ): ContractDocViewEntity {
    return new ContractDocViewEntity({
      contractId: record.id,
      contractName: `${record.car.model} - ${record.customer.name} 고객님`,
      resolutionDate: record.resolutionDate,
      documentCount: record.documents.length,
      userName: record.user.name,
      carNumber: record.car.carNumber,
      documents: record.documents,
    });
  }
}
