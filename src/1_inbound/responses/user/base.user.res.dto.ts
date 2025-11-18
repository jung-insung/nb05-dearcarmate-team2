import { PersistUserEntity } from "../../../2_domain/entities/user/user.entity";
import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";

export class BaseUserResDto {
  public id: number;
  public name: string;
  public email: string;
  public employeeNumber: string;
  public phoneNumber: string;
  public imageUrl: string;
  public isAdmin: boolean;
  public company: {
    companyName: string;
  };

  constructor(entity: PersistUserEntityWithCompany) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.employeeNumber = entity.employeeNumber;
    this.phoneNumber = entity.phoneNumber;
    this.imageUrl = entity.imageUrl;
    this.isAdmin = entity.isAdmin;
    this.company = {
      companyName: entity.company.companyName,
    };
  }
}
