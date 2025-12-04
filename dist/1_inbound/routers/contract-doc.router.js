"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocRouter = void 0;
const base_router_1 = require("./base.router");
class ContractDocRouter extends base_router_1.BaseRouter {
    constructor(_contractDocController, _authMiddleware, _fileUploadMiddleware) {
        super("/contractDocuments");
        this._contractDocController = _contractDocController;
        this._authMiddleware = _authMiddleware;
        this._fileUploadMiddleware = _fileUploadMiddleware;
        this.registerContractDocRouter();
    }
    registerContractDocRouter() {
        this.router.get("/", this._authMiddleware.isUserAuthenticate, this.catch(this._contractDocController.getContractDocs));
        this.router.get("/draft", this._authMiddleware.isUserAuthenticate, this.catch(this._contractDocController.getContractsForDraft));
        this.router.post("/upload", this._authMiddleware.isUserAuthenticate, this._fileUploadMiddleware.upload.single("file"), this._fileUploadMiddleware.contractDocUploadHandler, this.catch(this._contractDocController.uploadContractDoc));
        this.router.get("/:contractDocId/download", this._authMiddleware.isUserAuthenticate, this.catch(this._contractDocController.downloadContractDoc));
    }
}
exports.ContractDocRouter = ContractDocRouter;
//# sourceMappingURL=contract-doc.router.js.map