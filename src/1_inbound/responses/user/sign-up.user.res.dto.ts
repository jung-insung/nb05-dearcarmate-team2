import { PersistUserEntity } from "../../../2_domain/entities/user/user.entity";
import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";
import { BaseUserResDto } from "./base.user.res.dto";

export class SignUpUserResDto extends BaseUserResDto {
  constructor(newUser: PersistUserEntityWithCompany) {
    super(newUser);
  }
}
