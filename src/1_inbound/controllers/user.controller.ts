import { NextFunction, Request, Response } from "express";
import { BaseController, ControllerHandler } from "./base.controller";
import { userFieldExceptionMap } from "../requests/validater-map";
import {
  registerUserReqSchema,
  updateUserReqSchema,
} from "../requests/user-schema.request";
import { SignUpUserResDto } from "../responses/user/sign-up.user.res.dto";
import { IUserService } from "../port/services/user.service.interface";
import { UpdateUserResDto } from "../responses/user/update.user.res.dto";

export interface IUserController {
  signUpUserController: ControllerHandler;
}

export class UserController extends BaseController {
  constructor(private _userService: IUserService) {
    super();
  }

  signUpUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(
      registerUserReqSchema,
      { body: req.body },
      userFieldExceptionMap,
    );

    const newUser = await this._userService.signUpUser(reqDto);

    const resDto = new SignUpUserResDto(newUser);

    return res.json(resDto);
  };

  updateUserController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(
      updateUserReqSchema,
      { body: req.body, userId: req.userId },
      userFieldExceptionMap,
    );

    const updatedUser = await this._userService.updateUser(reqDto);

    const resDto = new UpdateUserResDto(updatedUser);

    return res.json(reqDto);
  };
}
