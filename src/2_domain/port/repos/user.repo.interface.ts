import { PersistUserEntity } from "../../entities/user/user.entity";

export interface IUserRepo {
  findUserByEmail(email: string): Promise<PersistUserEntity | null>;
}