import {
  NewUserEntity,
  PersistUserEntity,
  UpdateUserEntity,
} from "../../entities/user/user.entity";

export type LockType = "share" | "beta";

export interface IUserRepo {
  /**
   * 회원 가입 시에만 사용하므로 락을 고려할 필요가 없음
   */
  findUserByEmail(email: string): Promise<PersistUserEntity | null>;

  /**
   * @throws TechnicalException UNIQUE_VIOLATION_EMAIL
   */
  create(entity: NewUserEntity): Promise<PersistUserEntity>;

  /**
   * @throws Error lockType이 유효하지 않은 값일 경우
   */
  findUserById(
    id: number,
    lockType?: LockType | undefined,
  ): Promise<PersistUserEntity | null>;

  /**
   *
   * @throws TechnicalException UNIQUE_VIOLATION_EMAIL
   * @throws TechnicalException OPTIMISTIC_LOCK_FAILED
   */
  update(entity: UpdateUserEntity): Promise<PersistUserEntity>;
}
