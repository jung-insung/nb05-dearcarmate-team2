"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarCsvUtil = void 0;
const business_exception_1 = require("../exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../exceptions/business.exceptions/exception-info");
const car_schema_request_1 = require("../../1_inbound/requests/car-schema.request");
const car_type_util_1 = require("./car-type.util");
function normalizeManufacturer(raw) {
    const v = raw.trim().replace(/\s+/g, "");
    if (["기아", "현대", "쉐보레"].includes(v))
        return v;
    throw new business_exception_1.BusinessException({
        type: exception_info_1.BusinessExceptionType.INVALID_MANUFACTURER,
    });
}
function toNumber(value, errorType) {
    const n = Number(value);
    if (Number.isNaN(n))
        throw new business_exception_1.BusinessException({ type: errorType });
    return n;
}
class CarCsvUtil {
    static parse(content) {
        const lines = content
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean);
        if (lines.length === 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_FILE_EMPTY,
            });
        }
        if (lines.length <= 1) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
            });
        }
        const header = lines[0].split(",").map((h) => h.trim());
        const expected = [
            "carNumber",
            "manufacturer",
            "model",
            "manufacturingYear",
            "mileage",
            "price",
            "accidentCount",
            "explanation",
            "accidentDetails",
        ];
        if (header.length < expected.length) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_INVALID_CSV_HEADER,
            });
        }
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",");
            if (row.length < expected.length) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
                });
            }
            let [carNumber, rawManufacturer, model, yearStr, mileageStr, priceStr, accidentStr, explanation, accidentDetails,] = row.map((v) => v.trim());
            // 차량번호 공백 제거 + 형식 검증 추가
            const cleanedCarNumber = carNumber.replace(/\s+/g, "");
            if (!car_schema_request_1.CAR_NUMBER_REGEX.test(cleanedCarNumber)) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.INVALID_CAR_NUMBER,
                });
            }
            const manufacturer = normalizeManufacturer(rawManufacturer);
            const manufacturingYear = toNumber(yearStr, exception_info_1.BusinessExceptionType.INVALID_MANUFACTURINGYEAR);
            const mileage = toNumber(mileageStr, exception_info_1.BusinessExceptionType.INVALID_MILEAGE);
            const price = toNumber(priceStr, exception_info_1.BusinessExceptionType.INVALID_PRICE);
            const accidentCount = toNumber(accidentStr || "0", exception_info_1.BusinessExceptionType.INVALID_ACCIDENTCOUNT);
            const type = car_type_util_1.MODEL_TYPE_MAP[model] ?? "세단";
            result.push({
                carNumber: cleanedCarNumber,
                manufacturer,
                model,
                manufacturingYear,
                mileage,
                price,
                accidentCount,
                explanation: explanation || undefined,
                accidentDetails: accidentDetails || undefined,
                type,
            });
        }
        if (result.length === 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
            });
        }
        return result;
    }
}
exports.CarCsvUtil = CarCsvUtil;
//# sourceMappingURL=car-csv.util.js.map