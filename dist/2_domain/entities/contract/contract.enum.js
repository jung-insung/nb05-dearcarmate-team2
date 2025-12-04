"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmTime = exports.ContractStatus = void 0;
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["CAR_INSPECTION"] = "carInspection";
    ContractStatus["PRICE_NEGOTIATION"] = "priceNegotiation";
    ContractStatus["CONTRACT_DRAFT"] = "contractDraft";
    ContractStatus["CONTRACT_SUCCESSFUL"] = "contractSuccessful";
    ContractStatus["CONTRACT_FAILED"] = "contractFailed";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
var AlarmTime;
(function (AlarmTime) {
    AlarmTime["DAY_BEFORE_9AM"] = "DAY_BEFORE_9AM";
    AlarmTime["ON_DAY_9AM"] = "ON_DAY_9AM";
})(AlarmTime || (exports.AlarmTime = AlarmTime = {}));
//# sourceMappingURL=contract.enum.js.map