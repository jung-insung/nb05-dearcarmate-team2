"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessExceptionTable = exports.BusinessExceptionType = void 0;
var BusinessExceptionType;
(function (BusinessExceptionType) {
    BusinessExceptionType[BusinessExceptionType["BAD_REQUEST"] = 0] = "BAD_REQUEST";
    BusinessExceptionType[BusinessExceptionType["MEETING_COUNT"] = 1] = "MEETING_COUNT";
    BusinessExceptionType[BusinessExceptionType["PASSWORD_TOO_LONG"] = 2] = "PASSWORD_TOO_LONG";
    BusinessExceptionType[BusinessExceptionType["NAME_TOO_LONG"] = 3] = "NAME_TOO_LONG";
    BusinessExceptionType[BusinessExceptionType["USERID_FORM"] = 4] = "USERID_FORM";
    BusinessExceptionType[BusinessExceptionType["EMAIL_FORM"] = 5] = "EMAIL_FORM";
    BusinessExceptionType[BusinessExceptionType["USERNAME_FORM"] = 6] = "USERNAME_FORM";
    BusinessExceptionType[BusinessExceptionType["PASSWORD_FORM"] = 7] = "PASSWORD_FORM";
    BusinessExceptionType[BusinessExceptionType["EMPLOYEENUMBER_FORM"] = 8] = "EMPLOYEENUMBER_FORM";
    BusinessExceptionType[BusinessExceptionType["PHONENUMBER_FORM"] = 9] = "PHONENUMBER_FORM";
    BusinessExceptionType[BusinessExceptionType["COMPANYID_FORM"] = 10] = "COMPANYID_FORM";
    BusinessExceptionType[BusinessExceptionType["IMAGEURL_FORM"] = 11] = "IMAGEURL_FORM";
    BusinessExceptionType[BusinessExceptionType["COMPANYNAME_FORM"] = 12] = "COMPANYNAME_FORM";
    BusinessExceptionType[BusinessExceptionType["COMPANYCODE_FORM"] = 13] = "COMPANYCODE_FORM";
    BusinessExceptionType[BusinessExceptionType["REFRESH_FORM"] = 14] = "REFRESH_FORM";
    BusinessExceptionType[BusinessExceptionType["INVALID_REQUEST"] = 15] = "INVALID_REQUEST";
    BusinessExceptionType[BusinessExceptionType["NOT_FOUND"] = 16] = "NOT_FOUND";
    BusinessExceptionType[BusinessExceptionType["EMAIL_DUPLICATE"] = 17] = "EMAIL_DUPLICATE";
    BusinessExceptionType[BusinessExceptionType["COMPANY_NAME_DUPLICATE"] = 18] = "COMPANY_NAME_DUPLICATE";
    BusinessExceptionType[BusinessExceptionType["COMPANY_CODE_DUPLICATE"] = 19] = "COMPANY_CODE_DUPLICATE";
    BusinessExceptionType[BusinessExceptionType["SIGNUP_PASSWORD_MISMATCH"] = 20] = "SIGNUP_PASSWORD_MISMATCH";
    BusinessExceptionType[BusinessExceptionType["PASSWORD_MISMATCH"] = 21] = "PASSWORD_MISMATCH";
    BusinessExceptionType[BusinessExceptionType["COMPANY_NOT_EXIST"] = 22] = "COMPANY_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["USER_NOT_EXIST"] = 23] = "USER_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["DOCUMENT_NOT_EXIST"] = 24] = "DOCUMENT_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["TOKEN_EXPIRED"] = 25] = "TOKEN_EXPIRED";
    BusinessExceptionType[BusinessExceptionType["TOKEN_MISMATCH"] = 26] = "TOKEN_MISMATCH";
    BusinessExceptionType[BusinessExceptionType["INVALID_AUTH"] = 27] = "INVALID_AUTH";
    BusinessExceptionType[BusinessExceptionType["USERID_NOT_EXIST"] = 28] = "USERID_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["REFRESHTOKEN_MISMATCH"] = 29] = "REFRESHTOKEN_MISMATCH";
    BusinessExceptionType[BusinessExceptionType["CAR_NOT_EXIST"] = 30] = "CAR_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["INVALID_CAR_NUMBER"] = 31] = "INVALID_CAR_NUMBER";
    BusinessExceptionType[BusinessExceptionType["DUPLICATE_CAR_NUMBER"] = 32] = "DUPLICATE_CAR_NUMBER";
    BusinessExceptionType[BusinessExceptionType["INVALID_MANUFACTURER"] = 33] = "INVALID_MANUFACTURER";
    BusinessExceptionType[BusinessExceptionType["INVALID_MODEL"] = 34] = "INVALID_MODEL";
    BusinessExceptionType[BusinessExceptionType["INVALID_MANUFACTURINGYEAR"] = 35] = "INVALID_MANUFACTURINGYEAR";
    BusinessExceptionType[BusinessExceptionType["INVALID_MILEAGE"] = 36] = "INVALID_MILEAGE";
    BusinessExceptionType[BusinessExceptionType["INVALID_PRICE"] = 37] = "INVALID_PRICE";
    BusinessExceptionType[BusinessExceptionType["INVALID_ACCIDENTCOUNT"] = 38] = "INVALID_ACCIDENTCOUNT";
    BusinessExceptionType[BusinessExceptionType["INVALID_EXPLANATION"] = 39] = "INVALID_EXPLANATION";
    BusinessExceptionType[BusinessExceptionType["INVALID_ACCIDENTDETAILS"] = 40] = "INVALID_ACCIDENTDETAILS";
    BusinessExceptionType[BusinessExceptionType["CAR_UPLOAD_FILE_NOT_UPLOADED"] = 41] = "CAR_UPLOAD_FILE_NOT_UPLOADED";
    BusinessExceptionType[BusinessExceptionType["CAR_UPLOAD_FILE_EMPTY"] = 42] = "CAR_UPLOAD_FILE_EMPTY";
    BusinessExceptionType[BusinessExceptionType["CAR_UPLOAD_INVALID_CSV_HEADER"] = 43] = "CAR_UPLOAD_INVALID_CSV_HEADER";
    BusinessExceptionType[BusinessExceptionType["CAR_UPLOAD_NO_VALID_DATA"] = 44] = "CAR_UPLOAD_NO_VALID_DATA";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_NOT_EXIST"] = 45] = "CUSTOMER_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_DATA_CHANGED"] = 46] = "CUSTOMER_DATA_CHANGED";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_DATA_ARLEADY_DELETE"] = 47] = "CUSTOMER_DATA_ARLEADY_DELETE";
    BusinessExceptionType[BusinessExceptionType["NOT_ADMIN"] = 48] = "NOT_ADMIN";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_NAME_FORM"] = 49] = "CUSTOMER_NAME_FORM";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_PHONENUMBER_FORM"] = 50] = "CUSTOMER_PHONENUMBER_FORM";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_EMAIL_FORM"] = 51] = "CUSTOMER_EMAIL_FORM";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_KEYWORD_ERR"] = 52] = "CUSTOMER_KEYWORD_ERR";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_FILE_NOT_UPLOAD"] = 53] = "CUSTOMER_FILE_NOT_UPLOAD";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_UPLOAD_FILE_EMPTY"] = 54] = "CUSTOMER_UPLOAD_FILE_EMPTY";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_FILE_DATAFORM_INCOREECT"] = 55] = "CUSTOMER_FILE_DATAFORM_INCOREECT";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_UPLOAD_INVALID_CSV_HEADER"] = 56] = "CUSTOMER_UPLOAD_INVALID_CSV_HEADER";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_CSV_INVALID_GENDER"] = 57] = "CUSTOMER_CSV_INVALID_GENDER";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_CSV_INVALID_AGEGROUP"] = 58] = "CUSTOMER_CSV_INVALID_AGEGROUP";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_CSV_INVALID_REGION"] = 59] = "CUSTOMER_CSV_INVALID_REGION";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_CSV_INVALID_NAME"] = 60] = "CUSTOMER_CSV_INVALID_NAME";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_CSV_INVALID_EMAIL"] = 61] = "CUSTOMER_CSV_INVALID_EMAIL";
    BusinessExceptionType[BusinessExceptionType["CUSTOMER_CSV_INVALID_PHONENUMBER"] = 62] = "CUSTOMER_CSV_INVALID_PHONENUMBER";
    BusinessExceptionType[BusinessExceptionType["VALIDATION_ERROR"] = 63] = "VALIDATION_ERROR";
    BusinessExceptionType[BusinessExceptionType["CONTRACTFORDOC_NOT_EXIST"] = 64] = "CONTRACTFORDOC_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["CONTRACT_NOT_EXIST"] = 65] = "CONTRACT_NOT_EXIST";
    BusinessExceptionType[BusinessExceptionType["CONTRACT_STATUS_CHANGED"] = 66] = "CONTRACT_STATUS_CHANGED";
    BusinessExceptionType[BusinessExceptionType["CONTRACT_DATA_CHANGED"] = 67] = "CONTRACT_DATA_CHANGED";
    BusinessExceptionType[BusinessExceptionType["ALREADY_EXIST_EAMIL"] = 68] = "ALREADY_EXIST_EAMIL";
    BusinessExceptionType[BusinessExceptionType["CONTRACT_NO_AUTHORITY"] = 69] = "CONTRACT_NO_AUTHORITY";
})(BusinessExceptionType || (exports.BusinessExceptionType = BusinessExceptionType = {}));
exports.BusinessExceptionTable = {
    // 형식 오류
    [BusinessExceptionType.BAD_REQUEST]: {
        statusCode: 400,
        message: "잘못된 요청입니다.",
    },
    [BusinessExceptionType.MEETING_COUNT]: {
        statusCode: 404,
        message: "미팅은 최대 3개까지만 생성 가능합니다.",
    },
    [BusinessExceptionType.PASSWORD_TOO_LONG]: {
        statusCode: 404,
        message: "비밀번호가 너무 깁니다.",
    },
    [BusinessExceptionType.NAME_TOO_LONG]: {
        statusCode: 404,
        message: "이름은 최대 10자까지 입력해주세요.",
    },
    [BusinessExceptionType.USERID_FORM]: {
        statusCode: 400,
        message: "userId 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.EMAIL_FORM]: {
        statusCode: 400,
        message: "이메일 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.USERNAME_FORM]: {
        statusCode: 400,
        message: "이름 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.PASSWORD_FORM]: {
        statusCode: 400,
        message: "비밀번호 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.EMPLOYEENUMBER_FORM]: {
        statusCode: 400,
        message: "사원번호 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.PHONENUMBER_FORM]: {
        statusCode: 400,
        message: "전화번호 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.COMPANYID_FORM]: {
        statusCode: 400,
        message: "companyId 양식과 다릅니다.",
    },
    [BusinessExceptionType.IMAGEURL_FORM]: {
        statusCode: 400,
        message: "이미지url 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.COMPANYNAME_FORM]: {
        statusCode: 400,
        message: "회사이름 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.COMPANYCODE_FORM]: {
        statusCode: 400,
        message: "회사코드 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.REFRESH_FORM]: {
        statusCode: 400,
        message: "리플래쉬 토큰 양식이 안 맞습니다.",
    },
    [BusinessExceptionType.SIGNUP_PASSWORD_MISMATCH]: {
        statusCode: 401,
        message: "비밀번호와 비밀번호 확인이 서로 다릅니다.",
    },
    [BusinessExceptionType.PASSWORD_MISMATCH]: {
        statusCode: 401,
        message: "비밀번호가 일치하지 않습니다.",
    },
    [BusinessExceptionType.REFRESHTOKEN_MISMATCH]: {
        statusCode: 401,
        message: "리프래쉬 토큰이 일치하지 않습니다.",
    },
    [BusinessExceptionType.INVALID_AUTH]: {
        statusCode: 401,
        message: "인증이 유효하지 않습니다.",
    },
    [BusinessExceptionType.INVALID_CAR_NUMBER]: {
        statusCode: 404,
        message: "올바르지 않은 차량번호 형식입니다.",
    },
    [BusinessExceptionType.INVALID_MANUFACTURER]: {
        statusCode: 404,
        message: "제조사가 올바르지 않습니다.",
    },
    [BusinessExceptionType.INVALID_MODEL]: {
        statusCode: 404,
        message: "모델명이 올바르지 않습니다.",
    },
    [BusinessExceptionType.INVALID_MANUFACTURINGYEAR]: {
        statusCode: 404,
        message: "제조년도가 올바르지 않습니다.",
    },
    [BusinessExceptionType.INVALID_MILEAGE]: {
        statusCode: 404,
        message: "주행거리는 0이상이어야 합니다.",
    },
    [BusinessExceptionType.INVALID_PRICE]: {
        statusCode: 404,
        message: "가격은 0이상이어야 합니다.",
    },
    [BusinessExceptionType.INVALID_ACCIDENTCOUNT]: {
        statusCode: 404,
        message: "사고 횟수는 0이상이어야 합니다.",
    },
    [BusinessExceptionType.INVALID_EXPLANATION]: {
        statusCode: 404,
        message: "차량 설명 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.INVALID_ACCIDENTDETAILS]: {
        statusCode: 404,
        message: "사고 상세 설명 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CAR_UPLOAD_FILE_NOT_UPLOADED]: {
        statusCode: 400,
        message: "파일이 업로드되지 않았습니다.",
    },
    [BusinessExceptionType.CAR_UPLOAD_FILE_EMPTY]: {
        statusCode: 400,
        message: "업로드된 파일이 비어 있습니다.",
    },
    [BusinessExceptionType.CAR_UPLOAD_INVALID_CSV_HEADER]: {
        statusCode: 400,
        message: "CSV 헤더 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA]: {
        statusCode: 400,
        message: "유효한 차량 데이터가 존재하지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_NAME_FORM]: {
        statusCode: 400,
        message: "이름을 다시 입력해주세요",
    },
    [BusinessExceptionType.CUSTOMER_PHONENUMBER_FORM]: {
        statusCode: 400,
        message: "전화번호를 다시 입력해주세요",
    },
    [BusinessExceptionType.CUSTOMER_EMAIL_FORM]: {
        statusCode: 400,
        message: "이메일을 다시 입력해주세요",
    },
    [BusinessExceptionType.CUSTOMER_KEYWORD_ERR]: {
        statusCode: 400,
        message: "키워드를 다시 입력해주세요",
    },
    [BusinessExceptionType.CUSTOMER_FILE_NOT_UPLOAD]: {
        statusCode: 400,
        message: "파일이 업로드 되지 않았습니다. 다시 시도해 주세요",
    },
    [BusinessExceptionType.CUSTOMER_UPLOAD_FILE_EMPTY]: {
        statusCode: 400,
        message: "파일이 비어있습니다.",
    },
    [BusinessExceptionType.CUSTOMER_FILE_DATAFORM_INCOREECT]: {
        statusCode: 400,
        message: "데이터를 저장할 수 없습니다. 파일을 확인해주세요.",
    },
    [BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER]: {
        statusCode: 400,
        message: "데이터 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_CSV_INVALID_GENDER]: {
        statusCode: 400,
        message: "성별 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_CSV_INVALID_AGEGROUP]: {
        statusCode: 400,
        message: "나이 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_CSV_INVALID_REGION]: {
        statusCode: 400,
        message: "지역 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_CSV_INVALID_NAME]: {
        statusCode: 400,
        message: "이름 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_CSV_INVALID_EMAIL]: {
        statusCode: 400,
        message: "이메일 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CUSTOMER_CSV_INVALID_PHONENUMBER]: {
        statusCode: 400,
        message: "Phonenumber 데이터 형식이 올바르지 않습니다.",
    },
    [BusinessExceptionType.CONTRACT_STATUS_CHANGED]: {
        statusCode: 400,
        message: "계약 현황을 다시 확인해주세요",
    },
    [BusinessExceptionType.CONTRACT_DATA_CHANGED]: {
        statusCode: 400,
        message: "변경된 계약 내용을 확인 후 다시 시도해주세요",
    },
    [BusinessExceptionType.VALIDATION_ERROR]: {
        statusCode: 404,
    },
    // 존재 유무
    [BusinessExceptionType.COMPANY_NOT_EXIST]: {
        statusCode: 404,
        message: "회사가 존재하지 않습니다.",
    },
    [BusinessExceptionType.USER_NOT_EXIST]: {
        statusCode: 404,
        message: "유저가 존재하지 않습니다.",
    },
    [BusinessExceptionType.USERID_NOT_EXIST]: {
        statusCode: 404,
        message: "페이로드에 유저ID가 없습니다.",
    },
    [BusinessExceptionType.CUSTOMER_NOT_EXIST]: {
        statusCode: 404,
        message: "고객정보가 존재하지 않습니다.",
    },
    [BusinessExceptionType.CAR_NOT_EXIST]: {
        statusCode: 404,
        message: "존재하지 않는 차량입니다.",
    },
    [BusinessExceptionType.CONTRACTFORDOC_NOT_EXIST]: {
        statusCode: 404,
        message: "완료된 계약에서 문서를 추가한 계약이 없습니다.",
    },
    [BusinessExceptionType.CONTRACT_NOT_EXIST]: {
        statusCode: 404,
        message: "계약이 존재하지 않습니다.",
    },
    [BusinessExceptionType.DOCUMENT_NOT_EXIST]: {
        statusCode: 404,
        message: "계약서가 존재하지 않습니다.",
    },
    // 중복, 충돌
    [BusinessExceptionType.EMAIL_DUPLICATE]: {
        statusCode: 409,
        message: "이미 존재한 이메일입니다.",
    },
    [BusinessExceptionType.COMPANY_NAME_DUPLICATE]: {
        statusCode: 409,
        message: "이미 존재한 회사 이름입니다.",
    },
    [BusinessExceptionType.COMPANY_CODE_DUPLICATE]: {
        statusCode: 409,
        message: "이미 존재한 회사 코드입니다.",
    },
    [BusinessExceptionType.CUSTOMER_DATA_CHANGED]: {
        statusCode: 409,
        message: "저장하지 못했습니다. 최신 정보로 새로고침 후 다시 시도해주세요",
    },
    [BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE]: {
        statusCode: 409,
        message: "요청하신 고객 정보가 삭제되었습니다.",
    },
    [BusinessExceptionType.ALREADY_EXIST_EAMIL]: {
        statusCode: 409,
        message: "이미 존재하는 이메일입니다.",
    },
    [BusinessExceptionType.DUPLICATE_CAR_NUMBER]: {
        statusCode: 409,
        message: "이미 존재하는 차량번호입니다.",
    },
    // 기타
    [BusinessExceptionType.INVALID_REQUEST]: {
        statusCode: 500,
        message: "잘못된 요청입니다.",
    },
    [BusinessExceptionType.NOT_FOUND]: {
        statusCode: 404,
        message: "클라이언트가 요청한 경로가 없습니다.",
    },
    [BusinessExceptionType.TOKEN_EXPIRED]: {
        statusCode: 401,
        message: "토큰이 만료되었습니다",
    },
    [BusinessExceptionType.TOKEN_MISMATCH]: {
        statusCode: 401,
        message: "올바른 토큰이 아닙니다.",
    },
    [BusinessExceptionType.NOT_ADMIN]: {
        statusCode: 403,
        message: "관리자가 아닙니다.",
    },
    [BusinessExceptionType.CONTRACT_NO_AUTHORITY]: {
        statusCode: 403,
        message: "담당 직원이 아닙니다.",
    },
};
//# sourceMappingURL=exception-info.js.map