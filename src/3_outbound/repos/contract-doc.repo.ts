import { ContractDocument } from "@prisma/client";
import { NewContractDocEntity, PersistContractDocEntity } from "../../2_domain/entities/cotract-doc/contract-doc.entity";
import { IContractDocRepo as IContractDocRepo } from "../../2_domain/port/repos/contract-doc.repo.interface";
import { BasePrismaClient, BaseRepo } from "./base.repo";
import { ContractDocMapper } from "../mappers/contract-doc.mapper";

export class ContractDocRepo extends BaseRepo implements IContractDocRepo {
  constructor(prisma: BasePrismaClient) {
    super(prisma);
  }

  async findContractDocById(
    id: number,
  ): Promise<PersistContractDocEntity> {
    const foundContractDoc = await this._prisma.contractDocument.findUnique({
      where: { id },
    });

    return ContractDocMapper.toPersistEntity(foundContractDoc!);
  }

  async create(entity: NewContractDocEntity): Promise<PersistContractDocEntity> {
    const newContractDoc = await this._prisma.contractDocument.create({
      data: {
        ...ContractDocMapper.toCreateData(entity)
      }
    });

    return ContractDocMapper.toPersistEntity(newContractDoc)
  }

}
