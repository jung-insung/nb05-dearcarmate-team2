"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeGender = normalizeGender;
exports.normalizeRegion = normalizeRegion;
exports.normalizeAgeGroup = normalizeAgeGroup;
const customer_enum_1 = require("../../2_domain/entities/customer/customer.enum");
const business_exception_1 = require("../exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../exceptions/business.exceptions/exception-info");
function normalizeGender(raw) {
    const v = raw.trim().toUpperCase();
    if (Object.values(customer_enum_1.CustomerGender).includes(v)) {
        return v;
    }
    const ko = raw.trim();
    if (["남", "남자"].includes(ko))
        return customer_enum_1.CustomerGender.MALE;
    if (["여", "여자"].includes(ko))
        return customer_enum_1.CustomerGender.FEMALE;
    throw new business_exception_1.BusinessException({
        type: exception_info_1.BusinessExceptionType.CUSTOMER_CSV_INVALID_GENDER,
    });
}
function normalizeRegion(raw) {
    if (!raw || raw.trim() === "")
        return undefined;
    const v = raw.trim().toUpperCase();
    if (Object.values(customer_enum_1.CustomerRegion).includes(v)) {
        return v;
    }
    const map = {
        서울: customer_enum_1.CustomerRegion.SEOUL,
        경기: customer_enum_1.CustomerRegion.GYEONGGI,
        인천: customer_enum_1.CustomerRegion.INCHEON,
        강원: customer_enum_1.CustomerRegion.GANGWON,
        충북: customer_enum_1.CustomerRegion.CHUNGBUK,
        충남: customer_enum_1.CustomerRegion.CHUNGNAM,
        세종: customer_enum_1.CustomerRegion.SEJONG,
        대전: customer_enum_1.CustomerRegion.DAEJEON,
        전북: customer_enum_1.CustomerRegion.JEONBUK,
        전남: customer_enum_1.CustomerRegion.JEONNAM,
        광주: customer_enum_1.CustomerRegion.GWANGJU,
        경북: customer_enum_1.CustomerRegion.GYEONGBUK,
        경남: customer_enum_1.CustomerRegion.GYEONGNAM,
        대구: customer_enum_1.CustomerRegion.DAEGU,
        울산: customer_enum_1.CustomerRegion.ULSAN,
        부산: customer_enum_1.CustomerRegion.BUSAN,
        제주: customer_enum_1.CustomerRegion.JEJU,
    };
    const ko = raw.trim();
    if (map[ko])
        return map[ko];
    throw new business_exception_1.BusinessException({
        type: exception_info_1.BusinessExceptionType.CUSTOMER_CSV_INVALID_REGION,
    });
}
function normalizeAgeGroup(raw) {
    if (!raw || raw.trim() === "")
        return undefined;
    const cleaned = raw.replace(/^\uFEFF/, "").trim();
    const upper = cleaned.toUpperCase();
    if (Object.values(customer_enum_1.CustomerAgeGroup).includes(upper)) {
        return upper;
    }
    const rangeMatch = cleaned.match(/^(\d{2})-(\d{2})$/);
    if (rangeMatch) {
        const start = rangeMatch[1];
        const mapRange = {
            "10": customer_enum_1.CustomerAgeGroup.TEN,
            "20": customer_enum_1.CustomerAgeGroup.TWENTY,
            "30": customer_enum_1.CustomerAgeGroup.THIRTY,
            "40": customer_enum_1.CustomerAgeGroup.FOURTY,
            "50": customer_enum_1.CustomerAgeGroup.FIFTY,
            "60": customer_enum_1.CustomerAgeGroup.SIXTY,
            "70": customer_enum_1.CustomerAgeGroup.SEVENTY,
            "80": customer_enum_1.CustomerAgeGroup.EIGHTY,
        };
        if (mapRange[start])
            return mapRange[start];
    }
    const mapSimple = {
        "10대": customer_enum_1.CustomerAgeGroup.TEN,
        "10": customer_enum_1.CustomerAgeGroup.TEN,
        "20대": customer_enum_1.CustomerAgeGroup.TWENTY,
        "20": customer_enum_1.CustomerAgeGroup.TWENTY,
        "30대": customer_enum_1.CustomerAgeGroup.THIRTY,
        "30": customer_enum_1.CustomerAgeGroup.THIRTY,
        "40대": customer_enum_1.CustomerAgeGroup.FOURTY,
        "40": customer_enum_1.CustomerAgeGroup.FOURTY,
        "50대": customer_enum_1.CustomerAgeGroup.FIFTY,
        "50": customer_enum_1.CustomerAgeGroup.FIFTY,
        "60대": customer_enum_1.CustomerAgeGroup.SIXTY,
        "60": customer_enum_1.CustomerAgeGroup.SIXTY,
        "70대": customer_enum_1.CustomerAgeGroup.SEVENTY,
        "70": customer_enum_1.CustomerAgeGroup.SEVENTY,
        "80대": customer_enum_1.CustomerAgeGroup.EIGHTY,
        "80": customer_enum_1.CustomerAgeGroup.EIGHTY,
    };
    if (mapSimple[cleaned])
        return mapSimple[cleaned];
    throw new business_exception_1.BusinessException({
        type: exception_info_1.BusinessExceptionType.CUSTOMER_CSV_INVALID_AGEGROUP,
    });
}
//# sourceMappingURL=customer-normalizer.util.js.map