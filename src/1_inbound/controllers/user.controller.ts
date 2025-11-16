import { NextFunction, Request, Response } from "express";
import { IUserService } from "../../2_domain/services/user.service";
import { BaseController, ControllerHandler } from "./base.controller";
import { userFieldExceptionMap } from "../requests/validater-map";
import { registerUserReqSchema } from "../requests/user-schema.request";

export interface IUserController {
  signUpUserController: ControllerHandler;
}

export class UserController extends BaseController {

  constructor(private _userService: IUserService) {
    super();
  }

  signUpUserController = async (req: Request, res: Response, next: NextFunction): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(
      registerUserReqSchema,
      { body: req.body },
      userFieldExceptionMap)

    const newUser = await this._userService.signUpUser(reqDto);

    const resDto = new signUpUserResDto(newUser);
    return res.json(resDto);
  }
}