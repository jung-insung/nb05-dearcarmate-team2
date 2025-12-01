"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const business_exception_1 = require("../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../4_shared/exceptions/business.exceptions/exception-info");
const dashboard_view_entity_1 = require("../entities/dashboard/dashboard-view.entity");
const base_service_1 = require("./base.service");
class DashboardService extends base_service_1.BaseService {
    constructor(unitOfwork) {
        super(unitOfwork);
    }
    async getData(dto) {
        const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);
        if (!foundUser) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.USER_NOT_EXIST,
            });
        }
        return this._unitOfWork.do(async (txRepos) => {
            const monthlySales = await txRepos.contract.getMonthlySalesAggregates(foundUser.companyId, "current");
            const lastMonthSales = await txRepos.contract.getMonthlySalesAggregates(foundUser.companyId, "last");
            const growthRate = lastMonthSales === 0
                ? monthlySales === 0
                    ? 0
                    : 100
                : ((monthlySales - lastMonthSales) / lastMonthSales) * 100;
            const { completedContractsCount, carTypeAggregates } = await txRepos.contract.getSuccessfulContractAggregates(foundUser.companyId);
            const proceedingContractsCount = await txRepos.contract.getProceedingContractAggregate(foundUser.companyId);
            const contractsByCarType = [];
            const salesByCarType = [];
            carTypeAggregates.forEach((cartype) => {
                contractsByCarType.push({
                    carType: cartype.type,
                    count: Number(cartype.count),
                });
                salesByCarType.push({
                    carType: cartype.type,
                    count: Number(cartype.totalSales) ? Number(cartype.totalSales) / 10000 : 0,
                });
            });
            const dashboard = new dashboard_view_entity_1.DashBoardViewEntity({
                monthlySales,
                lastMonthSales,
                growthRate,
                proceedingContractsCount,
                completedContractsCount,
                contractsByCarType,
                salesByCarType,
            });
            return dashboard;
        }, false, {
            useTransaction: true,
            isolationLevel: "RepeatableRead"
        });
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map