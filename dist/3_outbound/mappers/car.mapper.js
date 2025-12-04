"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarMapper = void 0;
const client_1 = require("@prisma/client");
const car_entity_1 = require("../../2_domain/entities/car/car.entity");
class CarMapper {
    static mapManufacturer(input) {
        switch (input) {
            case "기아":
                return client_1.CarManufacturer.KIA;
            case "현대":
                return client_1.CarManufacturer.HYUNDAI;
            case "쉐보레":
                return client_1.CarManufacturer.CHEVROLET;
            default:
                throw new Error("Invalid manufacturer");
        }
    }
    static toCreateEntity(req) {
        return car_entity_1.CarEntity.create({
            carNumber: req.carNumber,
            manufacturer: this.mapManufacturer(req.manufacturer),
            model: req.model,
            manufacturingYear: req.manufacturingYear,
            mileage: req.mileage,
            price: req.price,
            accidentCount: req.accidentCount ?? 0,
            explanation: req.explanation ?? null,
            accidentDetails: req.accidentDetails ?? null,
            companyId: req.companyId,
        });
    }
    static toUpdateEntity(existing, req) {
        return car_entity_1.CarEntity.update(existing, {
            ...(req.carNumber !== undefined && { carNumber: req.carNumber }),
            ...(req.manufacturer !== undefined && {
                manufacturer: this.mapManufacturer(req.manufacturer),
            }),
            ...(req.model !== undefined && { model: req.model }),
            ...(req.manufacturingYear !== undefined && {
                manufacturingYear: req.manufacturingYear,
            }),
            ...(req.mileage !== undefined && { mileage: req.mileage }),
            ...(req.price !== undefined && { price: req.price }),
            ...(req.accidentCount !== undefined && {
                accidentCount: req.accidentCount,
            }),
            ...(req.explanation !== undefined && {
                explanation: req.explanation ?? null,
            }),
            ...(req.accidentDetails !== undefined && {
                accidentDetails: req.accidentDetails ?? null,
            }),
        });
    }
    static fromPersistence(record) {
        return car_entity_1.CarEntity.fromPersistence(record);
    }
    static toResponse(entity) {
        const p = entity.toPersistence();
        const MANUFACTURER_MAP = {
            KIA: "기아",
            HYUNDAI: "현대",
            CHEVROLET: "쉐보레",
        };
        const TYPE_MAP = {
            SEDAN: "세단",
            COMPACT: "경차",
            SUV: "SUV",
        };
        const STATUS_MAP = {
            POSSESSION: "possession",
            CONTRACT_PROCEEDING: "contractProceeding",
            CONTRACT_COMPLETED: "contractCompleted",
        };
        return {
            id: p.id,
            carNumber: p.carNumber,
            manufacturer: MANUFACTURER_MAP[p.manufacturer] ?? p.manufacturer,
            model: p.model,
            type: TYPE_MAP[p.type] ?? p.type,
            manufacturingYear: p.manufacturingYear,
            mileage: p.mileage,
            price: p.price,
            accidentCount: p.accidentCount,
            explanation: p.explanation,
            accidentDetails: p.accidentDetails,
            status: STATUS_MAP[p.status] ?? p.status,
        };
    }
}
exports.CarMapper = CarMapper;
//# sourceMappingURL=car.mapper.js.map