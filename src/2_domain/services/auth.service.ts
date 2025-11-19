import { IAuthService } from "../../1_inbound/port/services/auth.service.interface";
import {
  LoginReqDto,
  RefreshAccessTokenReqDto,
} from "../../1_inbound/requests/auth-schema.request";
import { LoginUserResDto } from "../../1_inbound/responses/auth/login-user.res.dto";
import { PersistUserEntityWithCompany } from "../../3_outbound/mappers/user.mapper";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { ITokenUtil } from "../../4_shared/utils/token.util";
import { IBcryptHashManager } from "../port/managers/bcrypt-hash.manager.interface";
import { IUnitOfWork } from "../port/unit-of-work.interface";

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export class AuthService implements IAuthService {
  constructor(
    private _unitOfWork: IUnitOfWork,
    private _bcryptHashManager: IBcryptHashManager,
    private _tokenUtil: ITokenUtil,
  ) {}

  async loginUser(dto: LoginReqDto): Promise<{
    foundUser: PersistUserEntityWithCompany;
    tokens: TokenPair;
  }> {
    const { body } = dto;
    const { foundUser, refreshToken } = await this._unitOfWork.do(
      async (txRepos) => {
        const foundUser = await txRepos.user.findUserByEmail(body.email);

        if (!foundUser) {
          throw new BusinessException({
            type: BusinessExceptionType.USERID_NOT_EXIST,
          });
        }

        if (
          !(await foundUser.isPasswordMatch(
            body.password,
            this._bcryptHashManager,
          ))
        ) {
          throw new BusinessException({
            type: BusinessExceptionType.PASSWORD_MISMATCH,
          });
        }

        const refreshToken = this._tokenUtil.generateRefreshToken({
          userId: foundUser.id,
        });
        await foundUser.updateRefreshToken(
          refreshToken,
          this._bcryptHashManager,
        );
        await txRepos.user.update(foundUser);

        return { foundUser, refreshToken };
      },
    );

    const accessToken = this._tokenUtil.generateAccessToken({
      userId: foundUser.id,
    });
    const tokens = { accessToken, refreshToken };

    return { foundUser, tokens };
  }

  async refreshAccessToken(dto: RefreshAccessTokenReqDto): Promise<{
    refreshToken: string;
    accessToken: string;
  }> {
    const { userId } = this._tokenUtil.verify(dto.body.refreshToken);

    const updatedRefreshToken = await this._unitOfWork.do(async (txRepos) => {
      const foundUser = await txRepos.user.findUserById(userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USERID_NOT_EXIST,
        });
      }

      if (
        !(await foundUser.isRefreshTokenMatch(
          dto.body.refreshToken,
          this._bcryptHashManager,
        ))
      ) {
        throw new BusinessException({
          type: BusinessExceptionType.REFRESHTOKEN_MISMATCH,
        });
      }

      const newRefreshToken = this._tokenUtil.generateRefreshToken({ userId });
      await foundUser.updateRefreshToken(
        newRefreshToken,
        this._bcryptHashManager,
      );

      await txRepos.user.update(foundUser);

      return newRefreshToken;
    });

    const accessToken = this._tokenUtil.generateAccessToken({ userId });

    return {
      refreshToken: updatedRefreshToken,
      accessToken,
    };
  }
}
