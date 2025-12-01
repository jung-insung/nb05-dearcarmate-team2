import { PersistUserEntity } from "../../../2_domain/entities/user/user.entity";
import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";
import { BaseUserResDto } from "./base.user.res.dto";

export class UpdateUserResDto extends BaseUserResDto {
  constructor(updatedUser: PersistUserEntityWithCompany) {
    super(updatedUser);
  }
}
