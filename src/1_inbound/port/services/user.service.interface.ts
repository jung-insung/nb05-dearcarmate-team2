import { PersistUserEntity } from "../../../2_domain/entities/user/user.entity";
import { RegisterUserReqDto } from "../../requests/user-schema.request";

export interface IUserService {
  signUpUser(dto: RegisterUserReqDto): Promise<PersistUserEntity>;
}
