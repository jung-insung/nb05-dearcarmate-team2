"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRouter = void 0;
const base_router_1 = require("./base.router");
class ImageRouter extends base_router_1.BaseRouter {
    constructor(_imageController, _authMiddleware, _fileUploadMiddleware) {
        super("/images");
        this._imageController = _imageController;
        this._authMiddleware = _authMiddleware;
        this._fileUploadMiddleware = _fileUploadMiddleware;
        this.registerImageRouter();
    }
    registerImageRouter() {
        this.router.post("/upload", this._authMiddleware.isUserAuthenticate, this._fileUploadMiddleware.upload.single("file"), this._fileUploadMiddleware.imageUploadHandler, this.catch(this._imageController.imageUploadController));
    }
}
exports.ImageRouter = ImageRouter;
//# sourceMappingURL=image.router.js.map