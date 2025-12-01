"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
class Server {
    constructor(_authRouter, _userRouter, _companyRouter, _customerRouter, _carRouter, _contract, _contractDoc, _image, _dashboard, _configUtil, _corsMiddleware, _loggerMiddleware, _jsonMiddleware, _notFoundMiddleware, _globalErrorMiddleware, _staticFileMiddleware) {
        this._authRouter = _authRouter;
        this._userRouter = _userRouter;
        this._companyRouter = _companyRouter;
        this._customerRouter = _customerRouter;
        this._carRouter = _carRouter;
        this._contract = _contract;
        this._contractDoc = _contractDoc;
        this._image = _image;
        this._dashboard = _dashboard;
        this._configUtil = _configUtil;
        this._corsMiddleware = _corsMiddleware;
        this._loggerMiddleware = _loggerMiddleware;
        this._jsonMiddleware = _jsonMiddleware;
        this._notFoundMiddleware = _notFoundMiddleware;
        this._globalErrorMiddleware = _globalErrorMiddleware;
        this._staticFileMiddleware = _staticFileMiddleware;
        this._app = (0, express_1.default)();
    }
    listen() {
        this._app.listen(this._configUtil.getParsed().PORT, () => {
            console.log(`app server listening on port ${this._configUtil.getParsed().PORT}`);
        });
    }
    start() {
        this._app.use(this._corsMiddleware.handler());
        this._app.use(this._loggerMiddleware.handler());
        this._app.use(this._jsonMiddleware.handler());
        this._app.use(this._staticFileMiddleware.basePath, this._staticFileMiddleware.handler());
        // routers
        this._app.use(this._authRouter.basePath, this._authRouter.router);
        this._app.use(this._userRouter.basePath, this._userRouter.router);
        this._app.use(this._companyRouter.basePath, this._companyRouter.router);
        this._app.use(this._carRouter.basePath, this._carRouter.router);
        this._app.use(this._customerRouter.basePath, this._customerRouter.router);
        this._app.use(this._contract.basePath, this._contract.router);
        this._app.use(this._contractDoc.basePath, this._contractDoc.router);
        this._app.use(this._image.basePath, this._image.router);
        this._app.use(this._dashboard.basePath, this._dashboard.router);
        this._app.use(this._notFoundMiddleware.handler());
        this._app.use(this._globalErrorMiddleware.handler);
        this.listen();
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map