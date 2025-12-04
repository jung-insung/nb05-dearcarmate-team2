"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const base_service_1 = require("./base.service");
class AuthService extends base_service_1.BaseService {
    constructor(_bcryptHashManager, _tokenUtil, unitOfWork) {
        super(unitOfWork);
        this._bcryptHashManager = _bcryptHashManager;
        this._tokenUtil = _tokenUtil;
    }
    async loginUser(dto) {
        const { body } = dto;
        const { foundUser, refreshToken } = await this._unitOfWork.do(async (txRepos) => {
            const foundUser = await txRepos.user.findUserByEmail(body.email);
            if (!foundUser) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.USERID_NOT_EXIST,
                });
            }
            if (!(await foundUser.isPasswordMatch(body.password, this._bcryptHashManager))) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.PASSWORD_MISMATCH,
                });
            }
            const refreshToken = this._tokenUtil.generateRefreshToken({
                userId: foundUser.id,
            });
            await foundUser.updateRefreshToken(refreshToken, this._bcryptHashManager);
            await txRepos.user.update(foundUser);
            return { foundUser, refreshToken };
        });
        const accessToken = this._tokenUtil.generateAccessToken({
            userId: foundUser.id,
        });
        const tokens = { accessToken, refreshToken };
        return { foundUser, tokens };
    }
    async refreshAccessToken(dto) {
        const { userId } = this._tokenUtil.verify(dto.body.refreshToken);
        const updatedRefreshToken = await this._unitOfWork.do(async (txRepos) => {
            const foundUser = await txRepos.user.findUserById(userId);
            if (!foundUser) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.USERID_NOT_EXIST,
                });
            }
            if (!(await foundUser.isRefreshTokenMatch(dto.body.refreshToken, this._bcryptHashManager))) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.REFRESHTOKEN_MISMATCH,
                });
            }
            const newRefreshToken = this._tokenUtil.generateRefreshToken({ userId });
            await foundUser.updateRefreshToken(newRefreshToken, this._bcryptHashManager);
            await txRepos.user.update(foundUser);
            return newRefreshToken;
        });
        const accessToken = this._tokenUtil.generateAccessToken({ userId });
        return {
            refreshToken: updatedRefreshToken,
            accessToken,
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map