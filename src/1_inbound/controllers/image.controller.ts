import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { imageUploadReqSchema } from "../requests/image-schema.request";
import { IUserService } from "../port/services/user.service.interface";
import { ImageUploadResDto } from "../responses/image/image-upload-res.dto";

export class ImageController extends BaseController {
  constructor(private _userService: IUserService) {
    super();
  }

  imageUploadController = async (
    req: Request,
    res: Response,
  ) => {
    const reqDto = this.validateOrThrow(
      imageUploadReqSchema,
      {
        userId: req.userId,
        body: req.body
      }
    )

    await this._userService.checkUserExists(reqDto.userId);

    const resDto = new ImageUploadResDto(reqDto.body.url);

    return res.json(resDto);
  }

}