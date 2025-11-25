import { NewContractDocEntity, PersistContractDocEntity } from "../../entities/cotract-doc/contract-doc.entity";

export interface IContractDocRepo {
  create(entity: NewContractDocEntity): Promise<PersistContractDocEntity>;
  findContractDocById(id: number): Promise<PersistContractDocEntity>;
}
