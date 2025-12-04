"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarListResDto = exports.CarResDto = void 0;
const car_mapper_1 = require("../../3_outbound/mappers/car.mapper");
class CarResDto {
    constructor(entity) {
        const r = car_mapper_1.CarMapper.toResponse(entity);
        Object.assign(this, r);
    }
}
exports.CarResDto = CarResDto;
class CarListResDto {
    constructor(params) {
        this.currentPage = params.currentPage;
        this.totalPages = params.totalPages;
        this.totalItemCount = params.totalItemCount;
        this.data = params.items.map((i) => new CarResDto(i));
    }
}
exports.CarListResDto = CarListResDto;
//# sourceMappingURL=car.res.dto.js.map