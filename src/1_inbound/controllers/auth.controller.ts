import { Request, Response } from "express";
import { NextFunction } from "express";
import { IAuthService } from "../port/services/auth.service.interface";
import { BaseController, ControllerHandler } from "./base.controller";
import {
  loginReqSchema,
  refreshAccessTokenReqSchema,
} from "../requests/auth-schema.request";
import { LoginUserResDto } from "../responses/auth/login-user.res.dto";
import { RefreshAccessTokenResDto } from "../responses/auth/refresh-acess-token.res.dto";

export class AuthController extends BaseController {
  constructor(private _authService: IAuthService) {
    super();
  }

  login = async (req: Request, res: Response): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(loginReqSchema, { body: req.body });

    const { foundUser: loginUser, tokens } =
      await this._authService.loginUser(reqDto);

    const resDto = new LoginUserResDto(loginUser, tokens);

    return res.json(resDto);
  };

  refreshAccessToken = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(refreshAccessTokenReqSchema, {
      body: req.body,
    });

    const tokens = await this._authService.refreshAccessToken(reqDto);

    const resDto = new RefreshAccessTokenResDto(tokens);

    return res.json(resDto);
  };
}
