"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const base_controller_1 = require("./base.controller");
const user_schema_request_1 = require("../requests/user-schema.request");
const sign_up_user_res_dto_1 = require("../responses/user/sign-up.user.res.dto");
const update_user_res_dto_1 = require("../responses/user/update.user.res.dto");
const delete_user_res_dto_1 = require("../responses/user/delete.user.res.dto");
const get_user_res_dto_1 = require("../responses/user/get.user.res.dto");
class UserController extends base_controller_1.BaseController {
    constructor(_userService) {
        super();
        this._userService = _userService;
        this.signUpUserController = async (req, res) => {
            const reqDto = this.validateOrThrow(user_schema_request_1.registerUserReqSchema, {
                body: req.body,
            });
            const newUser = await this._userService.signUpUser(reqDto);
            const resDto = new sign_up_user_res_dto_1.SignUpUserResDto(newUser);
            return res.json(resDto);
        };
        this.updateUserController = async (req, res) => {
            const reqDto = this.validateOrThrow(user_schema_request_1.updateUserReqSchema, {
                body: req.body,
                userId: req.userId,
            });
            const updatedUser = await this._userService.updateUser(reqDto);
            const resDto = new update_user_res_dto_1.UpdateUserResDto(updatedUser);
            return res.json(resDto);
        };
        this.getUserController = async (req, res) => {
            const reqDto = this.validateOrThrow(user_schema_request_1.getUserReqSchema, {
                userId: req.userId,
            });
            const getUser = await this._userService.getUser(reqDto);
            const resDto = new get_user_res_dto_1.GetUserResDto(getUser);
            return res.json(resDto);
        };
        this.deleteUserController = async (req, res) => {
            const reqDto = this.validateOrThrow(user_schema_request_1.deleteUserReqSchema, {
                params: req.params,
                userId: req.userId,
            });
            await this._userService.deleteUser(reqDto);
            const resDto = new delete_user_res_dto_1.DeleteUserReqDto();
            return res.json(resDto);
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map