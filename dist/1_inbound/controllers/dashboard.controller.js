"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const dashboard_shema_request_1 = require("../requests/dashboard-shema.request");
const base_controller_1 = require("./base.controller");
const dashboardData_res_dto_1 = require("../responses/dashboard/dashboardData.res.dto");
class DashboardController extends base_controller_1.BaseController {
    constructor(_dashboardService) {
        super();
        this._dashboardService = _dashboardService;
        this.getDashboardData = async (req, res) => {
            const reqDto = this.validateOrThrow(dashboard_shema_request_1.getDashboardDataReqSchema, {
                userId: req.userId,
            });
            const dashboardData = await this._dashboardService.getData(reqDto);
            const resDto = new dashboardData_res_dto_1.DashboardDataResDto(dashboardData);
            return res.json(resDto);
        };
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map