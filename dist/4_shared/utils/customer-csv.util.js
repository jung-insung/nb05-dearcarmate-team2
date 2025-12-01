"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerCSVUtil = void 0;
const business_exception_1 = require("../exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../exceptions/business.exceptions/exception-info");
const customer_normalizer_util_1 = require("./customer-normalizer.util");
class CustomerCSVUtil {
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
                type: exception_info_1.BusinessExceptionType.CUSTOMER_FILE_DATAFORM_INCOREECT,
            });
        }
        const header = lines[0].split(",").map((h) => h.trim());
        const expected = [
            "name",
            "email",
            "gender",
            "phoneNumber",
            "region",
            "ageGroup",
            "memo",
        ];
        if (header.length < expected.length) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER,
            });
        }
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(",");
            if (row.length < expected.length) {
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER,
                });
            }
            const [name, email, rawGender, phoneNumber, rawRegion, rawAgeGroup, memo,] = row;
            if (!name)
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.CUSTOMER_CSV_INVALID_NAME,
                });
            if (!email)
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.CUSTOMER_CSV_INVALID_EMAIL,
                });
            if (!phoneNumber)
                throw new business_exception_1.BusinessException({
                    type: exception_info_1.BusinessExceptionType.CUSTOMER_CSV_INVALID_PHONENUMBER,
                });
            const gender = (0, customer_normalizer_util_1.normalizeGender)(rawGender);
            const ageGroup = (0, customer_normalizer_util_1.normalizeAgeGroup)(rawAgeGroup);
            const region = (0, customer_normalizer_util_1.normalizeRegion)(rawRegion);
            result.push({
                body: {
                    name,
                    email,
                    gender,
                    phoneNumber,
                    region,
                    ageGroup,
                    memo,
                },
            });
        }
        return result;
    }
}
exports.CustomerCSVUtil = CustomerCSVUtil;
//# sourceMappingURL=customer-csv.util.js.map