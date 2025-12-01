"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL_TYPE_MAP = void 0;
exports.getCarTypeByModel = getCarTypeByModel;
exports.MODEL_TYPE_MAP = {
    K5: "세단",
    K7: "세단",
    K3: "세단",
    그랜저: "세단",
    소나타: "세단",
    스파크: "경차",
    투싼: "SUV",
    스포티지: "SUV",
    싼타페: "SUV",
    베뉴: "SUV",
    트랙스: "SUV",
};
function getCarTypeByModel(model) {
    return exports.MODEL_TYPE_MAP[model] ?? "세단";
}
//# sourceMappingURL=car-type.util.js.map