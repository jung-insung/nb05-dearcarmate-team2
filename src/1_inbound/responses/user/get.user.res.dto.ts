import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";
import { BaseUserResDto } from "./base.user.res.dto";

export class GetUserResDto extends BaseUserResDto {
  constructor(getUser: PersistUserEntityWithCompany) {
    super(getUser);
  }
}
