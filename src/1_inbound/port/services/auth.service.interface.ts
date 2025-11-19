import { TokenPair } from "../../../2_domain/services/auth.service";
import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";
import {
  LoginReqDto,
  RefreshAccessTokenReqDto,
} from "../../requests/auth-schema.request";

export interface IAuthService {
  /**
   * 유저 로그인 기능
   * 1. 해당 유저가 있는지 검증
   * 2. 비밀번호가 일치하는지 검증
   * 3. 리플래쉬 토큰 생성 및 DB에 저장
   * 4. 액세스 토큰 생성
   */
  loginUser(dto: LoginReqDto): Promise<{
    foundUser: PersistUserEntityWithCompany;
    tokens: TokenPair;
  }>;

  /**
   * 액세스 토큰 갱신 기능
   * 1. 파라미터로 받은 리플래쉬 토큰 복호화
   * 2. 해당 유저가 있는지 검증
   * 3. 유저가 저장한 리플래쉬 토큰과 일치하는지 검증
   * 4. 리플래쉬 토큰 갱신
   * 5. 액세스 토큰 갱신
   */
  refreshAccessToken(dto: RefreshAccessTokenReqDto): Promise<{
    refreshToken: string;
    accessToken: string;
  }>;
}
