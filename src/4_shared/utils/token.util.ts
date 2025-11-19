import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { IConfigUtil } from "../port/config.util.interface";
import { BusinessException } from "../exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../exceptions/business.exceptions/exception-info";

export interface ITokenUtil {
  generateAccessToken(payload: TokenPayload): string;
  generateRefreshToken(payload: TokenPayload): string;
  verify(token: string): TokenPayload;
}

export type TokenPayload = {
  userId: number;
};
export class TokenUtil implements ITokenUtil {
  constructor(private _configUtil: IConfigUtil) {}

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this._configUtil.getParsed().TOKEN_SECRET, {
      expiresIn: this._configUtil.getParsed().ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, this._configUtil.getParsed().TOKEN_SECRET, {
      expiresIn: this._configUtil.getParsed().REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  verify(token: string): TokenPayload {
    try {
      return jwt.verify(
        token,
        this._configUtil.getParsed().TOKEN_SECRET,
      ) as TokenPayload;
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        // 토큰 만료 시
        throw new BusinessException({
          type: BusinessExceptionType.TOKEN_EXPIRED,
        });
      }
      if (err instanceof JsonWebTokenError) {
        // 토큰이 다르면
        throw new BusinessException({
          type: BusinessExceptionType.TOKEN_MISMATCH,
        });
      }

      throw new BusinessException({
        message: "알 수 없는 토큰 에러",
      });
    }
  }
}
