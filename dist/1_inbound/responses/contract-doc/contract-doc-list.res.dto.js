"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractDocListResDto = void 0;
class contractDocListResDto {
    constructor(contractDocs) {
        this.currentPage = contractDocs.pagination.currentPage;
        this.totalPages = contractDocs.pagination.totalPages;
        this.totalItemCount = contractDocs.pagination.totalItemCount;
        this.data = contractDocs.data.map((contractDoc) => ({
            id: contractDoc.id,
            contractName: contractDoc.contractName,
            resolutionDate: contractDoc.resolutionDate,
            documentCount: contractDoc.documentCount,
            userName: contractDoc.userName,
            carNumber: contractDoc.carNumber,
            documents: contractDoc.documents.map((document) => ({
                id: document.id,
                fileName: document.fileName,
            })),
        }));
    }
}
exports.contractDocListResDto = contractDocListResDto;
//# sourceMappingURL=contract-doc-list.res.dto.js.map