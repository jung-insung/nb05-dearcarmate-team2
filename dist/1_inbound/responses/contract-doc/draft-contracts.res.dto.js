"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftcontractsResDto = void 0;
class DraftcontractsResDto {
    constructor(draftContracts) {
        this.drafts = draftContracts.map((contract) => ({
            id: contract.id,
            data: contract.contractName,
        }));
    }
}
exports.DraftcontractsResDto = DraftcontractsResDto;
//# sourceMappingURL=draft-contracts.res.dto.js.map