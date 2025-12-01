"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocController = void 0;
const base_controller_1 = require("./base.controller");
const contract_doc_schema_request_1 = require("../requests/contract-doc-schema.request");
const contract_doc_list_res_dto_1 = require("../responses/contract-doc/contract-doc-list.res.dto");
const draft_contracts_res_dto_1 = require("../responses/contract-doc/draft-contracts.res.dto");
const upload_contract_doc_res_dto_1 = require("../responses/contract-doc/upload-contract-doc.res.dto");
const path_1 = __importDefault(require("path"));
class ContractDocController extends base_controller_1.BaseController {
    constructor(_ContractDocService) {
        super();
        this._ContractDocService = _ContractDocService;
        this.getContractDocs = async (req, res) => {
            const reqDto = this.validateOrThrow(contract_doc_schema_request_1.contractDocListReqSchema, {
                userId: req.userId,
                query: req.query,
            });
            const contractDocList = await this._ContractDocService.getContractForDocView(reqDto);
            const resDto = new contract_doc_list_res_dto_1.contractDocListResDto(contractDocList);
            return res.json(resDto);
        };
        this.getContractsForDraft = async (req, res) => {
            const reqDto = this.validateOrThrow(contract_doc_schema_request_1.contractDocDraftListReqSchema, {
                userId: req.userId,
            });
            const draftContracts = await this._ContractDocService.getDraftContracts(reqDto);
            const resDto = new draft_contracts_res_dto_1.DraftcontractsResDto(draftContracts).drafts;
            return res.json(resDto);
        };
        this.uploadContractDoc = async (req, res) => {
            const reqDto = this.validateOrThrow(contract_doc_schema_request_1.contractDocUploadReqSchema, {
                userId: req.userId,
                body: req.body,
            });
            const uploadContractDoc = await this._ContractDocService.uploadContractDoc(reqDto);
            const resDto = new upload_contract_doc_res_dto_1.UploadContractDocResDto(uploadContractDoc);
            return res.json(resDto);
        };
        this.downloadContractDoc = async (req, res) => {
            const reqDto = this.validateOrThrow(contract_doc_schema_request_1.contractDocDownLoadReqSchema, {
                userId: req.userId,
                params: req.params,
            });
            const downloadcontractDocs = await this._ContractDocService.downloadcontractDocs(reqDto);
            res.setHeader("Content-Disposition", `attachment; filename="${downloadcontractDocs.fileName}"; filename*=UTF-8''${encodeURIComponent(downloadcontractDocs.fileName)}`);
            return res.sendFile(path_1.default.resolve(downloadcontractDocs.filePath));
        };
    }
}
exports.ContractDocController = ContractDocController;
//# sourceMappingURL=contract-doc.controller.js.map