"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractResponseDto = void 0;
class ContractResponseDto {
    constructor(data) {
        this.id = data.id;
        this.car = data.car;
        this.customer = data.customer;
        this.user = data.user;
        this.meetings = data.meetings;
        this.contractPrice = data.contractPrice;
        this.resolutionDate = data.resolutionDate;
        this.status = data.status;
        this.contractDocuments = data.contractDocuments;
    }
}
exports.ContractResponseDto = ContractResponseDto;
//# sourceMappingURL=contract.response.js.map