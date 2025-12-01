export enum TechnicalExceptionType {
  UNKNOWN_SERVER_ERROR,
  OPTIMISTIC_LOCK_FAILED,
  UNIQUE_VIOLATION,
  UNIQUE_VIOLATION_EMAIL,
  UNIQUE_VIOLATION_COMPANY_NAME,
  UNIQUE_VIOLATION_COMPANY_CODE,
  UNIQUE_VIOLATION_CUSTOMER,
  NOT_FOUND,
}

export const TechnicaalExceptionTable: Record<TechnicalExceptionType, string> =
  {
    [TechnicalExceptionType.UNKNOWN_SERVER_ERROR]:
      "알 수 없는 서버 에러가 발생했습니다.",
    [TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED]:
      "데이터 버전 충돌이 발생했습니다.(낙관적 락 실패)",
    [TechnicalExceptionType.UNIQUE_VIOLATION]:
      "데이터베이스 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL]:
      "이메일 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME]:
      "회사명 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE]:
      "회사코드 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_CUSTOMER]:
      "고객정보에 대한 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.NOT_FOUND]:
      "요청에 대한 데이터를 찾을 수 없습니다.",
  };
