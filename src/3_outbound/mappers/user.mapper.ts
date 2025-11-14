import { CreateUserData, PersistUserEntity, UserEntity } from "../../2_domain/entities/user/user.entity";
import { PersistDBUser } from "../repos/user.repo";

export class UserMapper {
  static toCreateData(entity: UserEntity): {
    user: CreateUserData
  } {
    return {
      user: entity.toCreateData()
    }
  }

  static toPersistEntity(record: PersistDBUser): PersistUserEntity {
    return {} as PersistUserEntity;
  }
}