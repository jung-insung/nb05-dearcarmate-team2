import {
  NewUserEntity,
  PersistUserEntity,
  UpdateUserEntity,
  UserEntity,
} from "../../2_domain/entities/user/user.entity";
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
};

export type UpdateUserData = {
  employeeNumber: string;
  phoneNumber: string;
  password: string;
  imageUrl: string;
  refreshToken?: string;
};

export interface PersistUserEntityWithCompany extends PersistUserEntity {
  company: {
    companyName: string;
  };
}

export class UserMapper {
  static toCreateData(entity: NewUserEntity): CreateUserData {
    const createUserData: CreateUserData = {
      companyId: entity.companyId,
      name: entity.name,
      email: entity.email,
      employeeNumber: entity.employeeNumber,
      phoneNumber: entity.phoneNumber,
      password: entity.password!,
      isAdmin: entity.isAdmin,
      version: entity.version,
    };
    return createUserData;
  }

  static toUpdateData(entity: UpdateUserEntity): UpdateUserData {
    const updateUserData: UpdateUserData = {
      employeeNumber: entity.employeeNumber,
      phoneNumber: entity.phoneNumber,
      password: entity.password!,
      imageUrl: entity.imageUrl!,
      refreshToken: entity.refreshToken,
    };
    return updateUserData;
  }

  static toPersistEntity(record: PersistDBUser): PersistUserEntityWithCompany {
    const entity = new UserEntity({
      id: record.id,
      companyId: record.companyId,
      name: record.name,
      email: record.email,
      employeeNumber: record.employeeNumber,
      phoneNumber: record.phoneNumber,
      password: record.password,
      imageUrl: record.imageUrl!,
      isAdmin: record.isAdmin,
      version: record.version,
      refreshToken: record.refreshToken ?? undefined,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    (entity as PersistUserEntityWithCompany).company = record.company;

    return entity as PersistUserEntityWithCompany;
  }
}
