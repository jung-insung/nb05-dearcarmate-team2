import { DashBoardViewEntity } from "../../../2_domain/entities/dashboard/dashboard-view.entity";

export class DashboardDataResDto {
  monthlySales: number;
  lastMonthSales: number;
  growthRate: number;
  proceedingContractsCount: number;
  completedContractsCount: number;
  contractsByCarType: {
    carType: string;
    count: number;
  }[];
  salesByCarType: {
    carType: string;
    count: number;
  }[];

  constructor(entity: DashBoardViewEntity) {
    this.monthlySales = entity.monthlySales;
    this.lastMonthSales = entity.lastMonthSales;
    this.growthRate = entity.growthRate;
    this.proceedingContractsCount = entity.proceedingContractsCount;
    this.completedContractsCount = entity.completedContractsCount;
    this.contractsByCarType = entity.contractsByCarType.map(item => ({
      carType: item.carType,
      count: item.count,
    }));
    this.salesByCarType = entity.salesByCarType.map(item => ({
      carType: item.carType,
      count: item.count,
    }));
  }
}