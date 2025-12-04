"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnicaalExceptionTable = exports.TechnicalExceptionType = void 0;
var TechnicalExceptionType;
(function (TechnicalExceptionType) {
    TechnicalExceptionType[TechnicalExceptionType["UNKNOWN_SERVER_ERROR"] = 0] = "UNKNOWN_SERVER_ERROR";
    TechnicalExceptionType[TechnicalExceptionType["OPTIMISTIC_LOCK_FAILED"] = 1] = "OPTIMISTIC_LOCK_FAILED";
    TechnicalExceptionType[TechnicalExceptionType["UNIQUE_VIOLATION"] = 2] = "UNIQUE_VIOLATION";
    TechnicalExceptionType[TechnicalExceptionType["UNIQUE_VIOLATION_EMAIL"] = 3] = "UNIQUE_VIOLATION_EMAIL";
    TechnicalExceptionType[TechnicalExceptionType["UNIQUE_VIOLATION_COMPANY_NAME"] = 4] = "UNIQUE_VIOLATION_COMPANY_NAME";
    TechnicalExceptionType[TechnicalExceptionType["UNIQUE_VIOLATION_COMPANY_CODE"] = 5] = "UNIQUE_VIOLATION_COMPANY_CODE";
    TechnicalExceptionType[TechnicalExceptionType["UNIQUE_VIOLATION_CUSTOMER"] = 6] = "UNIQUE_VIOLATION_CUSTOMER";
    TechnicalExceptionType[TechnicalExceptionType["NOT_FOUND"] = 7] = "NOT_FOUND";
})(TechnicalExceptionType || (exports.TechnicalExceptionType = TechnicalExceptionType = {}));
exports.TechnicaalExceptionTable = {
    [TechnicalExceptionType.UNKNOWN_SERVER_ERROR]: "알 수 없는 서버 에러가 발생했습니다.",
    [TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED]: "데이터 버전 충돌이 발생했습니다.(낙관적 락 실패)",
    [TechnicalExceptionType.UNIQUE_VIOLATION]: "데이터베이스 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL]: "이메일 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME]: "회사명 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE]: "회사코드 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_CUSTOMER]: "고객정보에 대한 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.NOT_FOUND]: "요청에 대한 데이터를 찾을 수 없습니다.",
};
//# sourceMappingURL=exception-info.js.map