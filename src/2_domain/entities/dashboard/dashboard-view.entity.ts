export class DashBoardViewEntity {
  private readonly _monthlySales: number;
  private readonly _lastMonthSales: number;
  private readonly _growthRate: number;
  private readonly _proceedingContractsCount: number;
  private readonly _completedContractsCount: number;
  private readonly _contractsByCarType: {
    carType: string;
    count: number;
  }[];
  private readonly _salesByCarType: {
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