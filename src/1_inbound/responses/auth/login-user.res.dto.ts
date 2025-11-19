import { TokenPair } from "../../../2_domain/services/auth.service";
import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";

export class LoginUserResDto {
  public user: {
    id: number;
    name: string;
    email: string;
    employeeNumber: string;
    phoneNumber: string;
    imageUrl: string;
    isAdmin: boolean;
    company: { companyName: string };
  };
  public accessToken: string;
  public refreshToken: string;

  constructor(entity: PersistUserEntityWithCompany, tokens: TokenPair) {
    this.user = {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      employeeNumber: entity.employeeNumber,
      phoneNumber: entity.phoneNumber,
      imageUrl: entity.imageUrl,
      isAdmin: entity.isAdmin,
      company: { companyName: entity.company.companyName },
    };
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken!;
  }
}
