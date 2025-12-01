import { Request, Response } from "express";
import { getDashboardDataReqSchema } from "../requests/dashboard-shema.request";
import { BaseController } from "./base.controller";
import { DashboardDataResDto } from "../responses/dashboard/dashboardData.res.dto";
import { IDashboardService } from "../port/services/dashboard.service.interface";

export class DashboardController extends BaseController {
  constructor(private _dashboardService: IDashboardService) {
    super();
  }

  getDashboardData = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(getDashboardDataReqSchema, {
      userId: req.userId,
    });

    const dashboardData = await this._dashboardService.getData(reqDto);
    const resDto = new DashboardDataResDto(dashboardData);

    return res.json(resDto);
  };
}
