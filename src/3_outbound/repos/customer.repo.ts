import { Prisma, PrismaClient } from "@prisma/client";
import {
  NewCustomerEntity,
  PersistCustomerEntites,
  PersistCustomerEntity,
  UpdateCustomerEntity,
} from "../../2_domain/entities/customer/customer.entity";
import { CustomerMapper } from "../mappers/customer.mapper";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { ICustomerRepo } from "../../2_domain/port/repos/customer.repo.interface";
import { BasePrismaClient, BaseRepo } from "./base.repo";

export class CustomerRepo extends BaseRepo implements ICustomerRepo {
  constructor(prisma: BasePrismaClient) {
    super(prisma);
  }

  async findById(id: number): Promise<PersistCustomerEntity | null> {
    const record = await this._prisma.customer.findUnique({
      where: { id },
    });
    return record ? CustomerMapper.fromPersistence(record) : null;
  }

  async findAll(params: {
    companyId: number;
    page: number;
    pageSize: number;
    searchBy?: "name" | "email";
    keyword?: string;
  }): Promise<PersistCustomerEntites> {
    const { companyId, page, pageSize, searchBy, keyword } = params;

    const where: Record<string, any> = { companyId };

    if (keyword && searchBy) {
      where[searchBy] = { contains: keyword };
    }

    const [records, totalItemCount] = await Promise.all([
      this._prisma.customer.findMany({
        where,
        skip: (page > 0 ? page - 1 : 0) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      this._prisma.customer.count({ where }),
    ]);

    return {
      totalItemCount,
      data: records.map((record) => CustomerMapper.fromPersistence(record)),
    };
  }

  async create(entity: NewCustomerEntity): Promise<PersistCustomerEntity> {
    try {
      const data = CustomerMapper.toPersistence(entity);
      const newRecord = await this._prisma.customer.create({ data });
      return CustomerMapper.fromPersistence(newRecord);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          throw new TechnicalException({
            type: TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL,
            error: err,
          });
        }
      }
      throw err;
    }
  }

  async update(
    id: number,
    entity: UpdateCustomerEntity,
  ): Promise<PersistCustomerEntity> {
    try {
      const data = CustomerMapper.toPersistence(entity);
      const updateRecord = await this._prisma.customer.update({
        where: { id, version: entity.version },
        data: {
          ...data,
          version: { increment: 1 },
        },
      });
      return CustomerMapper.fromPersistence(updateRecord);
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

  async increaseContractCount(id: number) {
    await this._prisma.customer.update({
      where: { id },
      data: {
        contractCount: { increment: 1 },
      },
    });
  }

  async decreaseContractCount(customerId: number): Promise<void> {
    await this._prisma.customer.updateMany({
      where: {
        id: customerId,
        contractCount: { gt: 0 },
      },
      data: {
        contractCount: { decrement: 1 },
      },
    });
  }
}
