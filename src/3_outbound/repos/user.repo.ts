import { Company, Prisma, User } from "@prisma/client";
import { BasePrismaClient, BaseRepo } from "./base.repo";
import {
  NewAdminEntity,
  NewUserEntity,
  UpdateUserEntity,
} from "../../2_domain/entities/user/user.entity";
import {
  PersistUserEntityWithCompany,
  UserMapper,
} from "../mappers/user.mapper";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import {
  IUserRepo,
  LockType,
} from "../../2_domain/port/repos/user.repo.interface";

export type PersistDBUser = User & {
  company?: {
    id: number;
    companyName: string;
  } | null;
};

export class UserRepo extends BaseRepo implements IUserRepo {
  private _includeOption: Prisma.UserInclude;

  constructor(prisma: BasePrismaClient) {
    super(prisma);
    this._includeOption = {
      company: {
        select: {
          id: true,
          companyName: true,
        },
      },
    };
  }

  async findUserByEmail(
    email: string,
    lockType?: LockType,
  ): Promise<PersistUserEntityWithCompany | null> {
    if (!lockType) {
      const foundUser = await this._prisma.user.findUnique({
        where: { email },
        include: this._includeOption,
      });

      return foundUser ? UserMapper.toPersistEntity(foundUser) : null;
    }

    let query: Prisma.Sql;
    switch (lockType) {
      case "share":
        query = Prisma.sql`SELECT * FROM "User" WHERE email = ${email} FOR SHARE`;
        break;
      case "beta":
        query = Prisma.sql`SELECT * FROM "User" WHERE email = ${email} FOR UPDATE`;
        break;
      default:
        throw new Error("유효하지 않은 잠금입니다.");
    }

    const users = await this._prisma.$queryRaw<User[]>(query);

    if (users.length !== 1) {
      return null;
    }

    const foundUser = await this._prisma.user.findUnique({
      where: { email },
      include: this._includeOption,
    });

    return UserMapper.toPersistEntity(foundUser!);
  }

  async findUserById(
    id: number,
    lockType?: LockType,
  ): Promise<PersistUserEntityWithCompany | null> {
    if (!lockType) {
      const foundUser = await this._prisma.user.findUnique({
        where: { id },
        include: this._includeOption,
      });

      return foundUser ? UserMapper.toPersistEntity(foundUser) : null;
    }

    let query: Prisma.Sql;
    switch (lockType) {
      case "share":
        query = Prisma.sql`SELECT * FROM "User" WHERE id = ${id} FOR SHARE`;
        break;
      case "beta":
        query = Prisma.sql`SELECT * FROM "User" WHERE id = ${id} FOR UPDATE`;
        break;
      default:
        throw new Error("유효하지 않은 잠금입니다.");
    }

    const users = await this._prisma.$queryRaw<User[]>(query);

    if (users.length !== 1) {
      return null;
    }

    const foundUser = await this._prisma.user.findUnique({
      where: { id },
      include: this._includeOption,
    });

    return UserMapper.toPersistEntity(foundUser!);
  }

  async create(entity: NewUserEntity | NewAdminEntity): Promise<PersistUserEntityWithCompany> {
    try {
      const newUser = await this._prisma.user.create({
        data: {
          ...UserMapper.toCreateData(entity),
        },
        include: this._includeOption,
      });

      return UserMapper.toPersistEntity(newUser);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          const target = (err.meta as any)?.target;

          if (target?.includes("email")) {
            throw new TechnicalException({
              type: TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL,
              error: err,
            });
          }
          throw err; // 또 다른 UNIQUE 에러 있을 시
        }
      }
      throw err;
    }
  }

  async update(
    entity: UpdateUserEntity,
  ): Promise<PersistUserEntityWithCompany> {
    try {
      const updatedUser = await this._prisma.user.update({
        where: {
          id: entity.id,
          version: entity.version,
        },
        data: {
          ...UserMapper.toUpdateData(entity),
          version: { increment: 1 },
        },
        include: this._includeOption,
      });

      return UserMapper.toPersistEntity(updatedUser);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          const target = (err.meta as any)?.target;

          if (target?.includes("email")) {
            throw new TechnicalException({
              type: TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL,
              error: err,
            });
          }
          throw err; // 또 다른 UNIQUE 에러 있을 시
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

  async delete(id: number): Promise<void> {
    try {
      await this._prisma.user.delete({
        where: { id },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return; // 팬텀 리드가 일어나도 그냥 삭제되었으니까 에러 던지지 말기
        }
      }
      throw err;
    }
  }
}
