"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocService = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const contract_doc_entity_1 = require("../entities/cotract-doc/contract-doc.entity");
const base_service_1 = require("./base.service");
class ContractDocService extends base_service_1.BaseService {
    constructor(unitOfWork) {
        super(unitOfWork);
    }
    async getContractForDocView(dto) {
        const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);
        if (!foundUser) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
            });
        }
        const foundContractDocs = await this._unitOfWork.repos.contract.getContractsForDocView(dto.query);
        return foundContractDocs;
    }
    async getDraftContracts(dto) {
        const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);
        if (!foundUser) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
            });
        }
        const foundContractDocs = await this._unitOfWork.repos.contract.getDraftContracts();
        return foundContractDocs;
    }
    async uploadContractDoc(dto) {
        return this._unitOfWork.do(async (repos) => {
            const foundUser = await repos.user.findUserById(dto.userId);
            if (!foundUser) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
                });
            }
            const NewContractDoc = contract_doc_entity_1.ContractDocEntity.createContractDoc({
                fileName: dto.body.fileName,
                filePath: dto.body.filePath,
            });
            const contractDoc = await repos.contractDoc.create(NewContractDoc);
            return contractDoc;
        }, false, {
            useTransaction: true,
            isolationLevel: "ReadCommitted"
        });
    }
    async downloadcontractDocs(dto) {
        const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);
        if (!foundUser) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
            });
        }
        const foundContractDoc = await this._unitOfWork.repos.contractDoc.findContractDocById(dto.params.contractDocId);
        if (!foundContractDoc) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.DOCUMENT_NOT_EXIST,
            });
        }
        return foundContractDoc;
    }
}
exports.ContractDocService = ContractDocService;
//# sourceMappingURL=contract-doc.service.js.map