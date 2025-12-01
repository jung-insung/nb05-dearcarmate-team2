"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarEntity = void 0;
const client_1 = require("@prisma/client");
class CarEntity {
    static fromPersistence(record) {
        return new CarEntity(record);
    }
    constructor(attrs) {
        this._id = "id" in attrs ? attrs.id : undefined;
        this._carNumber = attrs.carNumber;
        this._manufacturer = attrs.manufacturer;
        this._model = attrs.model;
        this._type = attrs.type;
        this._manufacturingYear = attrs.manufacturingYear;
        this._mileage = attrs.mileage;
        this._price = attrs.price;
        this._accidentCount = attrs.accidentCount;
        this._explanation = attrs.explanation ?? null;
        this._accidentDetails = attrs.accidentDetails ?? null;
        this._status = attrs.status;
        this._version = attrs.version;
        this._companyId = attrs.companyId;
        this._createdAt = "createdAt" in attrs ? attrs.createdAt : undefined;
        this._updatedAt = "updatedAt" in attrs ? attrs.updatedAt : undefined;
    }
    get id() {
        return this._id;
    }
    get carNumber() {
        return this._carNumber;
    }
    get manufacturer() {
        return this._manufacturer;
    }
    get model() {
        return this._model;
    }
    get type() {
        return this._type;
    }
    get manufacturingYear() {
        return this._manufacturingYear;
    }
    get mileage() {
        return this._mileage;
    }
    get price() {
        return this._price;
    }
    get accidentCount() {
        return this._accidentCount;
    }
    get explanation() {
        return this._explanation;
    }
    get accidentDetails() {
        return this._accidentDetails;
    }
    get status() {
        return this._status;
    }
    get version() {
        return this._version;
    }
    get companyId() {
        return this._companyId;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    static create(req) {
        return new CarEntity({
            ...req,
            type: CarEntity.calculateType(req.manufacturer, req.model),
            status: client_1.CarStatus.POSSESSION,
            version: 1,
        });
    }
    static update(existing, req) {
        const base = existing.toPersistence();
        const merged = {
            ...base,
            ...req,
            version: existing.version + 1,
        };
        if (req.model || req.manufacturer) {
            merged.type = CarEntity.calculateType(req.manufacturer ?? existing.manufacturer, req.model ?? existing.model);
        }
        return new CarEntity(merged);
    }
    static calculateType(_manufacturer, model) {
        if (["스파크", "모닝"].includes(model))
            return client_1.CarType.COMPACT;
        if (["K3", "K5", "K7", "K8", "K9", "그랜저", "아반떼", "소나타"].includes(model))
            return client_1.CarType.SEDAN;
        if (["투싼", "스포티지", "싼타페"].includes(model))
            return client_1.CarType.SUV;
        return client_1.CarType.SEDAN;
    }
    toCreateData() {
        return {
            carNumber: this._carNumber,
            manufacturer: this._manufacturer,
            model: this._model,
            type: this._type,
            manufacturingYear: this._manufacturingYear,
            mileage: this._mileage,
            price: this._price,
            accidentCount: this._accidentCount,
            explanation: this._explanation,
            accidentDetails: this._accidentDetails,
            status: this._status,
            version: this._version,
            companyId: this._companyId,
        };
    }
    // updateMany 조건용
    toUpdateData() {
        return this.toCreateData();
    }
    toPersistence() {
        return {
            id: this._id,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            ...this.toCreateData(),
        };
    }
}
exports.CarEntity = CarEntity;
//# sourceMappingURL=car.entity.js.map