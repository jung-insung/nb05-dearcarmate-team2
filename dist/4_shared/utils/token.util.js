"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtil = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const business_exception_1 = require("../exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../exceptions/business.exceptions/exception-info");
class TokenUtil {
    constructor(_configUtil) {
        this._configUtil = _configUtil;
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this._configUtil.getParsed().TOKEN_SECRET, {
            expiresIn: this._configUtil.getParsed().ACCESS_TOKEN_EXPIRES_IN,
        });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this._configUtil.getParsed().TOKEN_SECRET, {
            expiresIn: this._configUtil.getParsed().REFRESH_TOKEN_EXPIRES_IN,
        });
    }
    verify(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this._configUtil.getParsed().TOKEN_SECRET);
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                // 토큰 만료 시
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.TOKEN_EXPIRED,
                });
            }
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                // 토큰이 다르면
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.TOKEN_MISMATCH,
                });
            }
            throw new business_exception_1.BusinessException({
                message: "알 수 없는 토큰 에러",
            });
        }
    }
}
exports.TokenUtil = TokenUtil;
//# sourceMappingURL=token.util.js.map