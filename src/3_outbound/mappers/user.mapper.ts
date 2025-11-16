import { NewUserEntity, PersistUserEntity } from "../../2_domain/entities/user/user.entity";
import { PersistDBUser } from "../repos/user.repo";

export type CreateUserData = {
  companyId: number;
  name: string;
  email: string;
  employeeNumber: string;
  phoneNumber: string;
  password: string;
  isAdmin: boolean;
  version: number;
}

export type UpdateUserData = {
  employeeNumber?: string;
  phoneNumber?: string;
  password?: string;
  imageUrl?: string;
  version: number;
}

export class UserMapper {
  static toCreateData(entity: NewUserEntity): CreateUserData {
    const createUserData: CreateUserData = {
      companyId: entity.companyId,
      name: entity.name,
      email: entity.email,
      employeeNumber: entity.employeeNumber,
      phoneNumber: entity.phoneNumber,
      password: entity.password,
      isAdmin: entity.isAdmin,
      version: entity.version
    }
    return createUserData;
  }

  static toPersistEntity(record: PersistDBUser): PersistUserEntity {
    return {} as PersistUserEntity;
  }
}