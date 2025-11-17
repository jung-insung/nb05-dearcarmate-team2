import { PrismaClient } from "@prisma/client";
import { CarEntity } from "../../2_domain/entities/car/car.entity";
import { ICarRepo } from "../../2_domain/port/repos/car.repo.interface";
import { BaseRepo } from "./base.repo";

export class CarRepo extends BaseRepo implements ICarRepo {
  constructor(prisma: PrismaClient) {
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

    const record = await this._prisma.car.update({
      where: { id: entity.id! },
      data,
    });

    return CarEntity.fromPersistence(record);
  }

  async delete(params: { companyId: number; carId: number }): Promise<void> {
    await this._prisma.car.delete({
      where: {
        id: params.carId,
      },
    });
  }
}
