"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardDataReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.getDashboardDataReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
});
//# sourceMappingURL=dashboard-shema.request.js.map