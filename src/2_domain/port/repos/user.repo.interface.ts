import { NewUserEntity, PersistUserEntity } from "../../entities/user/user.entity";

export interface IUserRepo {
  findUserByEmail(email: string): Promise<PersistUserEntity | null>;
  create(entity: NewUserEntity): Promise<PersistUserEntity>;
}