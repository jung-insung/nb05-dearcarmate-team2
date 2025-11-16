export enum TechnicalExceptionType {
  UNKNOWN_SERVER_ERROR,
  OPTIMISTIC_LOCK_FAILED,
  UNIQUE_VIOLATION,
  UNIQUE_VIOLATION_EMAIL,
}

export const TechnicaalExceptionTable: Record<TechnicalExceptionType, string> = {
  [TechnicalExceptionType.UNKNOWN_SERVER_ERROR]:
    "알 수 없는 서버 에러가 발생했습니다.",
  [TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED]:
    "데이터 버전 충돌이 발생했습니다.(낙관적 락 실패)",
  [TechnicalExceptionType.UNIQUE_VIOLATION]:
    "데이터베이스 유니크 제약 조건 위반 에러가 발생했습니다.",
    [TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL]:
    "이메일 유니크 제약 조건 위반 에러가 발생했습니다."
};