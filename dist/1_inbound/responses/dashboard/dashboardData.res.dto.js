"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardDataResDto = void 0;
class DashboardDataResDto {
    constructor(entity) {
        this.monthlySales = entity.monthlySales;
        this.lastMonthSales = entity.lastMonthSales;
        this.growthRate = entity.growthRate;
        this.proceedingContractsCount = entity.proceedingContractsCount;
        this.completedContractsCount = entity.completedContractsCount;
        this.contractsByCarType = entity.contractsByCarType.map((item) => ({
            carType: item.carType,
            count: item.count,
        }));
        this.salesByCarType = entity.salesByCarType.map((item) => ({
            carType: item.carType,
            count: item.count,
        }));
    }
}
exports.DashboardDataResDto = DashboardDataResDto;
//# sourceMappingURL=dashboardData.res.dto.js.map