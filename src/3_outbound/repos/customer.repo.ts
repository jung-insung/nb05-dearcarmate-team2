import { Prisma, PrismaClient } from "@prisma/client";
import {
  NewCustomerEntity,
  PersistCustomerEntity,
  UpdateCustomerEntity,
} from "../../2_domain/entities/customer/customer.entity";
import { CustomerMapper } from "../mappers/customer.mapper";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";

export interface ICustomerRepo {
  findById(id: number): Promise<PersistCustomerEntity | null>;
  create(entity: NewCustomerEntity): Promise<PersistCustomerEntity>;

  /**
   *
   * @param id
   * @param entity
   * @throws {TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED}
   */
  update(
    id: number,
    entity: UpdateCustomerEntity,
  ): Promise<PersistCustomerEntity>;

  /**
   *
   * @param id
   * @throws {TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED}
   */
  delete(id: number): Promise<void>;
}

export class CustomerRepo implements ICustomerRepo {
  protected _prisma;
  constructor(_prisma: PrismaClient) {
    this._prisma = _prisma;
  }

  async findById(id: number): Promise<PersistCustomerEntity | null> {
    const record = await this._prisma.customer.findUnique({
      where: { id },
    });
    return record ? CustomerMapper.toPersistEntity(record) : null;
  }

  async create(entity: NewCustomerEntity): Promise<PersistCustomerEntity> {
    try {
      const newRecord = await this._prisma.customer.create({ data: entity });
      return CustomerMapper.toPersistEntity(newRecord);
    } catch (err) {
      throw err;
    }
  }

  async update(
    id: number,
    entity: UpdateCustomerEntity,
  ): Promise<PersistCustomerEntity> {
    try {
      const updateRecord = await this._prisma.customer.update({
        where: { id, version: entity.version },
        data: {
          ...entity,
          version: { increment: 1 },
        },
      });
      return CustomerMapper.toPersistEntity(updateRecord);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          throw new TechnicalException({
            type: TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
            error: err,
          });
        }
      }
      throw err;
    }
  }

  async find() {}

  async findAll() {}

  async delete(id: number): Promise<void> {
    try {
      await this._prisma.customer.delete({
        where: { id },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          throw new TechnicalException({
            type: TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
            error: err,
          });
        }
        throw err;
      }
    }
  }

  async uploadFileData() {}
}
