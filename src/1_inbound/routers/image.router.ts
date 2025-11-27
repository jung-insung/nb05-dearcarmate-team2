import { ImageController } from "../controllers/image.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { BaseRouter } from "./base.router";

export class ImageRouter extends BaseRouter {
  constructor(
    private _imageController: ImageController,
    private _authMiddleware: AuthMiddleware,
    private _fileUploadMiddleware: FileUploadMiddleware,
  ) {
    super("/images");
    this.registerImageRouter();
  }

  registerImageRouter() {
    this.router.post(
      "/upload",
      this._authMiddleware.isUserAuthenticate,
      this._fileUploadMiddleware.upload.single("file"),
      this._fileUploadMiddleware.imageUploadHandler,
      this.catch(this._imageController.imageUploadController),
    );
  }
}
