"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const base_controller_1 = require("./base.controller");
const auth_schema_request_1 = require("../requests/auth-schema.request");
const login_user_res_dto_1 = require("../responses/auth/login-user.res.dto");
const refresh_acess_token_res_dto_1 = require("../responses/auth/refresh-acess-token.res.dto");
class AuthController extends base_controller_1.BaseController {
    constructor(_authService) {
        super();
        this._authService = _authService;
        this.login = async (req, res) => {
            const reqDto = this.validateOrThrow(auth_schema_request_1.loginReqSchema, { body: req.body });
            const { foundUser: loginUser, tokens } = await this._authService.loginUser(reqDto);
            const resDto = new login_user_res_dto_1.LoginUserResDto(loginUser, tokens);
            return res.json(resDto);
        };
        this.refreshAccessToken = async (req, res) => {
            const reqDto = this.validateOrThrow(auth_schema_request_1.refreshAccessTokenReqSchema, {
                body: req.body,
            });
            const tokens = await this._authService.refreshAccessToken(reqDto);
            const resDto = new refresh_acess_token_res_dto_1.RefreshAccessTokenResDto(tokens);
            return res.json(resDto);
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map