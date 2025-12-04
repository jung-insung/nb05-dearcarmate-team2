"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashBoardViewEntity = void 0;
class DashBoardViewEntity {
    constructor(params) {
        this._monthlySales = params.monthlySales;
        this._lastMonthSales = params.lastMonthSales;
        this._growthRate = params.growthRate;
        this._proceedingContractsCount = params.proceedingContractsCount;
        this._completedContractsCount = params.completedContractsCount;
        this._contractsByCarType = params.contractsByCarType;
        this._salesByCarType = params.salesByCarType;
    }
    get monthlySales() {
        return this._monthlySales;
    }
    get lastMonthSales() {
        return this._lastMonthSales;
    }
    get growthRate() {
        return this._growthRate;
    }
    get proceedingContractsCount() {
        return this._proceedingContractsCount;
    }
    get completedContractsCount() {
        return this._completedContractsCount;
    }
    get contractsByCarType() {
        return this._contractsByCarType;
    }
    get salesByCarType() {
        return this._salesByCarType;
    }
}
exports.DashBoardViewEntity = DashBoardViewEntity;
//# sourceMappingURL=dashboard-view.entity.js.map