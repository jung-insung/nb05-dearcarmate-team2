import { Prisma, PrismaClient, User } from "@prisma/client";
import { BaseRepo } from "./base.repo";
import {
  NewUserEntity,
  PersistUserEntity,
} from "../../2_domain/entities/user/user.entity";
import { UserMapper } from "../mappers/user.mapper";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";

export type PersistDBUser = User;

export class UserRepo extends BaseRepo {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  /**
   * 회원 가입 시에만 사용하므로 락을 고려할 필요가 없음
   * @param email
   * @returns PersistUserEntity or null
   */
  async findUserByEmail(email: string): Promise<PersistUserEntity | null> {
    const foundUser = await this._prisma.user.findUnique({
      where: { email },
    });

    return foundUser ? UserMapper.toPersistEntity(foundUser) : null;
  }

  async create(entity: NewUserEntity): Promise<PersistUserEntity | null> {
    try {
      const newUser = await this._prisma.user.create({
        data: {
          ...UserMapper.toCreateData(entity),
        },
      });

      return newUser ? UserMapper.toPersistEntity(newUser) : null;
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
}
