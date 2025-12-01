"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocViewEntity = void 0;
class ContractDocViewEntity {
    constructor(params) {
        this._contractId = params.contractId;
        this._contractName = params.contractName;
        this._resolutionDate = params.resolutionDate;
        this._documentCount = params.documentCount;
        this._userName = params.userName;
        this._carNumber = params.carNumber;
        this._documents = params.documents;
    }
    get id() {
        return this._contractId;
    }
    get contractName() {
        return this._contractName;
    }
    get resolutionDate() {
        return this._resolutionDate;
    }
    get documentCount() {
        return this._documentCount;
    }
    get userName() {
        return this._userName;
    }
    get carNumber() {
        return this._carNumber;
    }
    get documents() {
        return this._documents;
    }
}
exports.ContractDocViewEntity = ContractDocViewEntity;
//# sourceMappingURL=contract-doc-view.entity.js.map