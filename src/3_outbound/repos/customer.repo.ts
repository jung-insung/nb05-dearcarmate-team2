import { PrismaClient } from "@prisma/client";
import {
  NewCustomerEntity,
  PersistCustomerEntity,
} from "../../2_domain/entities/customer/customer.entity";
import { CustomerMapper } from "../mappers/customer.mapper";

export interface ICustomerRepo {}

export class CustomerRepo implements ICustomerRepo {
  protected _prisma;
  constructor(_prisma: PrismaClient) {
    this._prisma = _prisma;
  }

  async findById(id: number): Promise<PersistCustomerEntity> {
    const record = await this._prisma.customer.findUnique({
      where: { id },
    });
    return CustomerMapper.toPersistEntity(record);
  }

  async create(entity: NewCustomerEntity): Promise<PersistCustomerEntity> {
    const newRecord = await this._prisma.customer.create({ data: entity });
    return CustomerMapper.toPersistEntity(newRecord);
  }

  async edit() {}

  async findAll() {}

  async delete(id: number): Promise<void> {
    await this._prisma.customer.delete({
      where: { id },
    });
  }

  async uploadFileData() {}
}
