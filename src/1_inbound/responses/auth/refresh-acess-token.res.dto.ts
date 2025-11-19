import { TokenPair } from "../../../2_domain/services/auth.service";

export class RefreshAccessTokenResDto {
  public accessToken: string;
  public refreshToken: string;

  constructor(tokens: TokenPair) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }
}
