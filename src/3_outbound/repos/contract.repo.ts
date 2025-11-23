import { ContractDocPagination } from "../../2_domain/services/contractDoc.service";
import { Prisma, ContractStatus as PrismaContractStatus } from "@prisma/client";
import { BasePrismaClient, BaseRepo } from "./base.repo";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import {
  ContractListRepoDto,
  IContractRepo,
} from "../../2_domain/port/repos/contract.repo.interface";
import { PersistContractEntity } from "../../2_domain/entities/contract/contract.entity";
import { ContractMapper } from "../mappers/contract.mapper";
import { ContractStatus } from "../../2_domain/entities/contract/contract.enum";
import { ContractRecord } from "../../2_domain/entities/contract/contract.entity.util";

export class ContractRepo extends BaseRepo implements IContractRepo {
  private _includeOption: Prisma.ContractInclude = {
    user: { select: { id: true, name: true, email: true } },
    customer: { select: { id: true, name: true, email: true } },
    car: { select: { id: true, model: true, carNumber: true } },
    meeting: true,
    contractDocuments: true,
  };
  private _includeOptionForDoc: Prisma.ContractInclude;

  constructor(prisma: BasePrismaClient) {
    super(prisma);
    this._includeOptionForDoc = {
      user: true,
      car: true,
      customer: true,
      documents: true
    }
  }

  private _toPrismaStatus(status: ContractStatus): PrismaContractStatus {
    switch (status) {
      case ContractStatus.CAR_INSPECTION:
        return PrismaContractStatus.CAR_INSPECTION;
      case ContractStatus.PRICE_NEGOTIATION:
        return PrismaContractStatus.PRICE_NEGOTIATION;
      case ContractStatus.CONTRACT_DRAFT:
        return PrismaContractStatus.CONTRACT_DRAFT;
      case ContractStatus.CONTRACT_SUCCESSFUL:
        return PrismaContractStatus.CONTRACT_SUCCESSFUL;
      case ContractStatus.CONTRACT_FAILED:
        return PrismaContractStatus.CONTRACT_FAILED;
      default:
        return PrismaContractStatus.CAR_INSPECTION;
    }
  }

  async findAll(
    query: ContractListRepoDto,
  ): Promise<{ contracts: PersistContractEntity[]; totalItemCount: number }> {
    try {
      const { offset, limit, keyword, searchBy, companyId, status } = query;

      const where: Prisma.ContractWhereInput = { companyId };

      if (status) {
        where.status = this._toPrismaStatus(status);
      }

      if (keyword) {
        if (searchBy === "customerName") {
          where.customer = { name: { contains: keyword } };
        } else if (searchBy === "userName") {
          where.user = { name: { contains: keyword } };
        }
      }

      const totalItemCount = await this._prisma.contract.count({ where });

      const records = await this._prisma.contract.findMany({
        where,
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: this._includeOption,
      });

      return {
        contracts: records.map(
          (r) =>
            ContractMapper.toPersistEntity(
              r as unknown as ContractRecord,
            ) as PersistContractEntity,
        ),
        totalItemCount,
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          throw new TechnicalException({
            type: TechnicalExceptionType.UNKNOWN_SERVER_ERROR,
            error: err,
          });
        }
      }

      throw err;
    }
  }


  // | ContractPagination 추가할 것
  async getContracts(pagination: ContractDocPagination) {
    let whereCondition: Prisma.ContractWhereInput = {};

    switch (pagination.searchBy) {
      case "userName":
        whereCondition.user = { name: { contains: pagination.keyword } };
        break;
      case "carNumber":
        whereCondition.car = { carNumber: { contains: pagination.keyword } };
        break;
      case "contractName":
        whereCondition.OR = [
          { car: { model: { contains: pagination.keyword } } },
          { customer: { name: { contains: pagination.keyword } } }
        ]
        break;
    }

    const contracts = await this._prisma.contract.findMany({
      where: whereCondition,
      include: this._includeOptionForDoc,
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      orderBy: { createdAt: "desc" }
    });

  }
}

