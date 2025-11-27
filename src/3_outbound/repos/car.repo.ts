import { Prisma, PrismaClient } from "@prisma/client";
import { CarEntity } from "../../2_domain/entities/car/car.entity";
import { ICarRepo } from "../../2_domain/port/repos/car.repo.interface";
import { BaseRepo } from "./base.repo";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";

export class CarRepo extends BaseRepo implements ICarRepo {
  constructor(prisma: PrismaClient | Prisma.TransactionClient) {
    super(prisma);
  }

  async create(entity: CarEntity): Promise<CarEntity> {
    const data = entity.toCreateData();

    const record = await this._prisma.car.create({
      data,
    });

    return CarEntity.fromPersistence(record);
  }

  async findById(params: {
    companyId: number;
    carId: number;
  }): Promise<CarEntity | null> {
    const record = await this._prisma.car.findFirst({
      where: {
        id: params.carId,
        companyId: params.companyId,
      },
    });
    return record ? CarEntity.fromPersistence(record) : null;
  }

  async findMany(params: {
    companyId: number;
    page: number;
    pageSize: number;
    status?: string;
    searchBy?: "carNumber" | "model";
    keyword?: string;
  }): Promise<{ items: CarEntity[]; totalItemCount: number }> {
    const { companyId, page, pageSize, status, searchBy, keyword } = params;

    const where: any = { companyId };

    if (status) {
      where.status = status;
    }

    if (keyword && searchBy) {
      where[searchBy] = { contains: keyword };
    }

    const [records, totalItemCount] = await Promise.all([
      this._prisma.car.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      this._prisma.car.count({ where }),
    ]);

    return {
      items: records.map((r) => CarEntity.fromPersistence(r)),
      totalItemCount,
    };
  }

  async update(entity: CarEntity): Promise<CarEntity> {
    const data = entity.toUpdateData();
    const { version, ...rest } = data;
    const previousVersion = version - 1;

    try {
      const record = await this._prisma.car.update({
        where: { id: entity.id!, version: previousVersion },
        data: {
          ...rest,
          version: { increment: 1 },
        },
      });

      return CarEntity.fromPersistence(record);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2025"
      ) {
        throw new TechnicalException({
          type: TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
          error: err,
        });
      }
      throw err;
    }
  }

  async delete(params: { companyId: number; carId: number }): Promise<void> {
    await this._prisma.car.deleteMany({
      where: {
        id: params.carId,
        companyId: params.companyId,
      },
    });
  }
}
