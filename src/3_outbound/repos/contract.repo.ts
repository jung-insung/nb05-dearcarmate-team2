import { ContractDocPagination } from "../../2_domain/services/contract-doc.service";
import { Prisma, ContractStatus as PrismaContractStatus } from "@prisma/client";
import { BasePrismaClient, BaseRepo } from "./base.repo";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import {
  ContractListRepoDto,
  IContractRepo,
} from "../../2_domain/port/repos/contract.repo.interface";
import {
  ContractEntity,
  PersistContractEntity,
} from "../../2_domain/entities/contract/contract.entity";
import { ContractMapper } from "../mappers/contract.mapper";
import { ContractStatus } from "../../2_domain/entities/contract/contract.enum";
import { ContractRecord } from "../../2_domain/entities/contract/contract.entity.util";
import { ContractDocMapper } from "../mappers/contract-doc.mapper";
import { ContractDocViewEntity } from "../../2_domain/entities/cotract-doc/contract-doc-view.entity";

export type ContractDBForDocView = Prisma.ContractGetPayload<{
  include: {
    user: true;
    car: true;
    customer: true;
    documents: true;
  };
}>;

export type ContractDocViewReturn = {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItemCount: number;
  };
  data: ContractDocViewEntity[];
};

export class ContractRepo extends BaseRepo implements IContractRepo {
  private _includeOption: Prisma.ContractInclude = {
    user: { select: { id: true, name: true, email: true } },
    customer: { select: { id: true, name: true, email: true } },
    car: { select: { id: true, model: true, carNumber: true } },
    meeting: true,
    documents: true,
  };

  private _includeOptionForDoc: Prisma.ContractInclude;

  constructor(prisma: BasePrismaClient) {
    super(prisma);
    this._includeOptionForDoc = {
      user: true,
      car: true,
      customer: true,
      documents: true,
    };
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

  async findById(id: number) {
    const record = await this._prisma.contract.findUnique({
      where: { id },
    });

    return ContractMapper.toPersistEntity(record as unknown as ContractRecord);
  }

  async updateStatus(id: number, status: ContractStatus, version: number) {
    try {
      const record = await this._prisma.contract.update({
        where: { id, version },
        data: {
          status: this._toPrismaStatus(status),
          version: { increment: 1 },
        },
        include: this._includeOption,
      });
      return ContractMapper.toPersistEntity(
        record as unknown as ContractRecord,
      );
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
  async update(id: number, entity: ContractEntity) {
    try {
      const { contract, meeting } = ContractMapper.toUpdateData(entity);
      const record = await this._prisma.contract.update({
        where: { id, version: contract.version },
        data: {
          ...contract,
          version: { increment: 1 },
          meeting: meeting,
        } as any,
        include: this._includeOption,
      });
      return ContractMapper.toPersistEntity(
        record as unknown as ContractRecord,
      );
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

  async findAll(
    query: ContractListRepoDto,
  ): Promise<{ contracts: PersistContractEntity[]; totalItemCount: number }> {
    try {
      const { offset, limit, keyword, searchBy, companyId, status } = query;
	  const queryMode: Prisma.QueryMode = "insensitive";

      const where: Prisma.ContractWhereInput = { companyId };

      if (status) {
        where.status = this._toPrismaStatus(status);
      }

      if (keyword) {
        switch (searchBy) {
          case "customerName":
            where.customer = { name: { contains: keyword, mode: queryMode } };
            break;
          case "userName":
            where.user = { name: { contains: keyword, mode: queryMode } };
            break;
          default:
            where.OR = [
              { customer: { name: { contains: keyword, mode: queryMode } } },
              { user: { name: { contains: keyword, mode: queryMode } } },
            ];
            break;
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

  async getContractsForDocView(
    pagination: ContractDocPagination,
  ): Promise<ContractDocViewReturn> {
    let whereCondition: Prisma.ContractWhereInput = {
      status: "CONTRACT_SUCCESSFUL",
      documents: {
        some: {},
      }
    };

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
          { customer: { name: { contains: pagination.keyword } } },
        ];
        break;
    }

    const contracts = await this._prisma.contract.findMany({
      where: whereCondition,
      include: this._includeOptionForDoc,
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      orderBy: { createdAt: "desc" },
    });
    const totalItemCount = contracts.length;
    const totalPages = Math.ceil(totalItemCount / pagination.pageSize);

    return {
      pagination: {
        currentPage: pagination.page,
        totalItemCount,
        totalPages,
      },
      data: contracts.map((contract) =>
        ContractDocMapper.toContractDocViewEntity(contract),
      ),
    };
  }
  async create(entity: ContractEntity): Promise<ContractEntity> {
    const { contract, meetings } = ContractMapper.toCreateData(entity);
    const record = await this._prisma.contract.create({
      data: {
        ...contract,
        meeting: {
          create: meetings as any,
        },
      } as any,
      include: this._includeOption,
    });

    return ContractMapper.toPersistEntity(record as unknown as ContractRecord);
  }

  async getDraftContracts(): Promise<ContractDocViewEntity[]> {
    const contracts = await this._prisma.contract.findMany({
      where: {
        status: 'CONTRACT_SUCCESSFUL',
        documents: {
          some: {},
        }
      },
      include: this._includeOptionForDoc
    });
    return contracts.map(contract =>
      ContractDocMapper.toContractDocViewEntity(contract)
    );
  }
}
