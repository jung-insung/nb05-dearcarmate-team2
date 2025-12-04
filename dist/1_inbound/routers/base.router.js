"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = __importDefault(require("express"));
class BaseRouter {
    constructor(basePath) {
        this.basePath = basePath;
        this.router = express_1.default.Router();
    }
    isAuthenticate(req, res, next) {
        next();
    }
    /***
     * 비동기 에러를 처리하기 위해 try catch를 감싸서 재해석함.
     */
    catch(handler) {
        return async (req, res, next) => {
            try {
                await handler(req, res, next);
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.BaseRouter = BaseRouter;
//# sourceMappingURL=base.router.js.map