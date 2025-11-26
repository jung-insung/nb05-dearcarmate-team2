export class DashBoardViewEntity {
  private readonly monthlySales: number;
  private readonly lastMonthSales: number;
  private readonly growthRate: number;
  private readonly proceedingContractsCount: number;
  private readonly completedContractsCount: number;
  private readonly contractsByCarType: {
    carType: string;
    count: number;
  }[];
  private readonly salesByCarType: {
    carType: string;
    count: number;
  }[];

  constructor(params: {
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
  }) {
    this.monthlySales = params.monthlySales;
    this.lastMonthSales = params.lastMonthSales;
    this.growthRate = params.growthRate;
    this.proceedingContractsCount = params.proceedingContractsCount;
    this.completedContractsCount = params.completedContractsCount;
    this.contractsByCarType = params.contractsByCarType;
    this.salesByCarType = params.salesByCarType;
  }

  get MonthlySales() {
    return this.monthlySales;
  }
  get LastMonthSales() {
    return this.lastMonthSales;
  }
  get GrowthRate() {
    return this.growthRate;
  }
  get ProceedingContractsCount() {
    return this.proceedingContractsCount;
  }
  get CompletedContractsCount() {
    return this.completedContractsCount;
  }
  get ContractsByCarType() {
    return this.contractsByCarType;
  }
  get SalesByCarType() {
    return this.salesByCarType;
  }
}