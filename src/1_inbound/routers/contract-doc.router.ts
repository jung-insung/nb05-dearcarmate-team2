import { ContractDocController } from "../controllers/contract-doc.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MulterMiddleware } from "../middlewares/multer.middleware";
import { BaseRouter } from "./base.router";

export class ContractDocRouter extends BaseRouter {
  constructor(
    private _contractDocController: ContractDocController,
    private _authMiddleware: AuthMiddleware,
    private _MulterMiddleware: MulterMiddleware,
  ) {
    super("/contractDocuments");
    this.registerContractDocRouter();
  }

  registerContractDocRouter() {
    this.router.get(
      "/",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractDocController.getContractDocs)
    );
    
    this.router.get(
      "/draft",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractDocController.getContractsForDraft)
    );

    this.router.post(
      "/upload",
      this._authMiddleware.isUserAuthenticate,
      this._MulterMiddleware.upload.single('contractDoc'),
      this._MulterMiddleware.contractDocUploadHandler,
      this.catch(this._contractDocController.uploadContractDoc)
    );

    this.router.get(
      "/:contractDocId/download",
      this._authMiddleware.isUserAuthenticate,
      this.catch(this._contractDocController.downloadContractDoc)
    );
  }
}
