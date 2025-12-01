"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocEntity = void 0;
class ContractDocEntity {
    constructor(attrs) {
        this._id = attrs.id;
        this._contractId = attrs.contractId;
        this._fileName = attrs.fileName;
        this._filePath = attrs.filePath;
        this._createdAt = attrs.createdAt;
        this._updatedAt = attrs.updatedAt;
    }
    get id() {
        return this._id;
    }
    get contractId() {
        return this._contractId;
    }
    get fileName() {
        return this._fileName;
    }
    get filePath() {
        return this._filePath;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    static createContractDoc(params) {
        const { filePath, fileName } = params;
        return new ContractDocEntity({
            fileName,
            filePath,
        });
    }
}
exports.ContractDocEntity = ContractDocEntity;
//# sourceMappingURL=contract-doc.entity.js.map