import { Request, Response } from "express";
import { BaseController, ControllerHandler } from "./base.controller";
import { userFieldExceptionMap } from "../requests/validater-map";
import {
  deleteUserReqSchema,
  getUserReqSchema,
  registerUserReqSchema,
  updateUserReqSchema,
} from "../requests/user-schema.request";
import { SignUpUserResDto } from "../responses/user/sign-up.user.res.dto";
import { IUserService } from "../port/services/user.service.interface";
import { UpdateUserResDto } from "../responses/user/update.user.res.dto";
import { DeleteUserReqDto } from "../responses/user/delete.user.res.dto";
import { GetUserResDto } from "../responses/user/get.user.res.dto";

export interface IUserController {
  signUpUserController: ControllerHandler;
  updateUserController: ControllerHandler;
  getUserController: ControllerHandler;
  deleteUserController: ControllerHandler;
}

export class UserController extends BaseController implements IUserController {
  constructor(private _userService: IUserService) {
    super();
  }

  signUpUserController = async (
    req: Request,
    res: Response,
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
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(
      updateUserReqSchema,
      { body: req.body, userId: req.userId },
      userFieldExceptionMap,
    );

    const updatedUser = await this._userService.updateUser(reqDto);

    const resDto = new UpdateUserResDto(updatedUser);

    return res.json(resDto);
  };

  getUserController = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(
      getUserReqSchema,
      { userId: req.userId },
      userFieldExceptionMap,
    );

    const getUser = await this._userService.getUser(reqDto);

    const resDto = new GetUserResDto(getUser);

    return res.json(resDto);
  };

  deleteUserController = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(
      deleteUserReqSchema,
      { params: req.params, userId: req.userId },
      userFieldExceptionMap,
    );

    await this._userService.deleteUser(reqDto);

    const resDto = new DeleteUserReqDto();

    return res.json(resDto);
  };
}
