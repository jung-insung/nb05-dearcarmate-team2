import {
  NewUserEntity,
  PersistUserEntity,
} from "../../entities/user/user.entity";

export interface IUserRepo {
  /**
   * 회원 가입 시에만 사용하므로 락을 고려할 필요가 없음
   * @param email 
   * @returns PersistUserEntity or null
   */
  findUserByEmail(email: string): Promise<PersistUserEntity | null>;
  
  create(entity: NewUserEntity): Promise<PersistUserEntity>;
}
