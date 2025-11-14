import { PrismaClient, User } from "@prisma/client";
import { BaseRepo } from "./base.repo";
import { PersistUserEntity } from "../../2_domain/entities/user/user.entity";
import { UserMapper } from "../mappers/user.mapper";

export type PersistDBUser = User;

export class UserRepo extends BaseRepo {

  constructor(prisma: PrismaClient) {
    super(prisma);
  };

  async findUserByEmail(email: string): Promise<PersistUserEntity | null> {
    const foundUser = await this._prisma.user.findUnique({
      where: { email },
    });

    return foundUser ? UserMapper.toPersistEntity(foundUser) : null; 
  }
}