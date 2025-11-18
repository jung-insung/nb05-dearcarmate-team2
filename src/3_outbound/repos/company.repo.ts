import { Prisma, PrismaClient, Company } from "@prisma/client";
import { BasePrismaClient, BaseRepo } from "./base.repo";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import {
  NewCompanyEntity,
  PersistCompanyEntity,
} from "../../2_domain/entities/company/company.entity";
import { CompanyMapper } from "../mappers/company.mapper";
import {
  ICompanyRepo,
  LockType,
} from "../../2_domain/port/repos/company.repo.interface";

export class CompanyRepo extends BaseRepo implements ICompanyRepo {
  constructor(prisma: BasePrismaClient) {
    super(prisma);
  }

  async findById(
    companyId: number,
    lockType?: LockType,
  ): Promise<PersistCompanyEntity | null> {
    if (!lockType) {
      const record = await this._prisma.company.findUnique({
        where: { id: companyId },
      });

      if (!record) {
        return null;
      }

      return CompanyMapper.toPersistEntity(record);
    }

    let query: Prisma.Sql;

    switch (lockType) {
      case "share":
        query = Prisma.sql`SELECT * FROM "Company" WHERE id = ${companyId} FOR SHARE`;
        break;
      case "beta":
        query = Prisma.sql`SELECT * FROM "Company" WHERE id = ${companyId} FOR UPDATE`;
        break;
      default:
        throw new Error("유효하지 않은 잠금 타입입니다.");
    }

    const records = await this._prisma.$queryRaw<Company[]>(query);
    const record = records[0];

    if (!record) {
      return null;
    }

    return CompanyMapper.toPersistEntity(record);
  }

  async findCompanyByCompanyCode(
    companyCode: string,
  ): Promise<PersistCompanyEntity | null> {
    const foundCompany = await this._prisma.company.findUnique({
      where: { companyCode },
    });

    return foundCompany ? CompanyMapper.toPersistEntity(foundCompany) : null;
  }

  async createCompany(entity: NewCompanyEntity): Promise<PersistCompanyEntity> {
    try {
      const createData = CompanyMapper.toCreateData(entity);
      const newRecord = await this._prisma.company.create({
        data: createData.company,
      });
      return CompanyMapper.toPersistEntity(newRecord);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          const target = (err.meta as any)?.target;

          if (target?.includes("companyName")) {
            throw new TechnicalException({
              type: TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME,
              error: err,
            });
          }
          if (target?.includes("companyCode")) {
            throw new TechnicalException({
              type: TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE,
              error: err,
            });
          }

          throw err;
        }
      }

      throw err;
    }
  }

  async updateCompany(
    entity: PersistCompanyEntity,
  ): Promise<PersistCompanyEntity> {
    try {
      const updateData = CompanyMapper.toUpdateData(entity);
      const updatedRecord = await this._prisma.company.update({
        where: {
          id: entity.id,
          version: entity.version - 1,
        },
        data: updateData.company,
      });
      return CompanyMapper.toPersistEntity(updatedRecord);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          const target = (err.meta as any)?.target;

          if (target?.includes("companyName")) {
            throw new TechnicalException({
              type: TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME,
              error: err,
            });
          }
          if (target?.includes("companyCode")) {
            throw new TechnicalException({
              type: TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE,
              error: err,
            });
          }

          throw err;
        } else if (err.code === "P2025") {
          throw new TechnicalException({
            type: TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED,
            error: err,
          });
        }
      }

      throw err;
    }
  }

  async deleteCompany(companyId: number): Promise<void> {
    try {
      await this._prisma.company.delete({
        where: { id: companyId },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          throw new TechnicalException({
            type: TechnicalExceptionType.NOT_FOUND,
            error: err,
          });
        }
      }
      throw err;
    }
  }
}
