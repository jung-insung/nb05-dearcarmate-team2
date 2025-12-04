"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const base_controller_1 = require("./base.controller");
const image_schema_request_1 = require("../requests/image-schema.request");
const image_upload_res_dto_1 = require("../responses/image/image-upload-res.dto");
class ImageController extends base_controller_1.BaseController {
    constructor(_userService) {
        super();
        this._userService = _userService;
        this.imageUploadController = async (req, res) => {
            const reqDto = this.validateOrThrow(image_schema_request_1.imageUploadReqSchema, {
                userId: req.userId,
                body: req.body,
            });
            await this._userService.checkUserExists(reqDto.userId);
            const resDto = new image_upload_res_dto_1.ImageUploadResDto(reqDto.body.url);
            return res.json(resDto);
        };
    }
}
exports.ImageController = ImageController;
//# sourceMappingURL=image.controller.js.map