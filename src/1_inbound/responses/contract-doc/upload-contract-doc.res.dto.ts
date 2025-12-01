import { PersistContractDocEntity } from "../../../2_domain/entities/cotract-doc/contract-doc.entity";

export class UploadContractDocResDto {
  public contractDocumentId: number;

  constructor(entity: PersistContractDocEntity) {
    this.contractDocumentId = entity.id;
  }
}
