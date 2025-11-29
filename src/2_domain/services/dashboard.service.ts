import { IDashboardService } from "../../1_inbound/port/services/dashboard.service.interface";
import { getDashboardDataReqDto } from "../../1_inbound/requests/dashboard-shema.request";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { DashBoardViewEntity } from "../entities/dashboard/dashboard-view.entity";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export class DashboardService extends BaseService implements IDashboardService {
  constructor(unitOfwork: IUnitOfWork) {
    super(unitOfwork);
  }

  async getData(dto: getDashboardDataReqDto): Promise<DashBoardViewEntity> {
    const foundUser = await this._unitOfWork.repos.user.findUserById(
      dto.userId,
    );
    if (!foundUser) {
      throw new BusinessException({
        type: BusinessExceptionType.USER_NOT_EXIST,
      });
    }

    return this._unitOfWork.do(async (txRepos) => {
      const monthlySales =
        await txRepos.contract.getMonthlySalesAggregates(foundUser.companyId,"current");
      const lastMonthSales =
        await txRepos.contract.getMonthlySalesAggregates(foundUser.companyId, "last");

      const growthRate =
        lastMonthSales === 0
          ? monthlySales === 0
            ? 0
            : 100
          : ((monthlySales - lastMonthSales) / lastMonthSales) * 100;

      const { completedContractsCount, carTypeAggregates } =
        await txRepos.contract.getSuccessfulContractAggregates(foundUser.companyId);

      const proceedingContractsCount =
        await txRepos.contract.getProceedingContractAggregate(foundUser.companyId);

      const contractsByCarType: { carType: string; count: number }[] = [];
      const salesByCarType: { carType: string; count: number }[] = [];

      carTypeAggregates.forEach((cartype) => {
        contractsByCarType.push({
          carType: cartype.type,
          count: Number(cartype.count),
        });
        salesByCarType.push({
          carType: cartype.type,
          count: Number(cartype.totalSales) ?? 0,
        });
      });

      const dashboard = new DashBoardViewEntity({
        monthlySales,
        lastMonthSales,
        growthRate,
        proceedingContractsCount,
        completedContractsCount,
        contractsByCarType,
        salesByCarType,
      });

      return dashboard;
    },false, {
      useTransaction: true,
      isolationLevel: "RepeatableRead"
    });
  }
}
