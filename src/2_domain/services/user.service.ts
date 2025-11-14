import { PersistUserEntity } from "../entities/user/user.entity";
import { IUserRepo } from "../port/repos/user.repo.interface";

export interface IUserService {
  signUpUserController(): Promise<PersistUserEntity>;
}

export class UserService {
  constructor(private _userRepo: IUserRepo) {

  }

  async signUpUserController(): Promise<PersistUserEntity> {

    return {} as PersistUserEntity
  }
}