import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";
import {
  DeleteUserReqDto,
  GetUserReqDto,
  RegisterUserReqDto,
  UpdateUserReqDto,
} from "../../requests/user-schema.request";

export interface IUserService {
  /**
   * 회원가입 처리
   * 1. 이메일 중복 확인
   * 2. 비번과 비번 확인란 일치 확인
   * 3. 등록된 회사 코드인지 검증
   * 4. 새로운 유저 엔티티 생성 및 저장
   * 5. 동시성 문제 - 팬텀 리드, Insert Race Condition
   * 6. 해결방안 - UNIQUE 제약 조건으로 해결
   */
  signUpUser(dto: RegisterUserReqDto): Promise<PersistUserEntityWithCompany>;

  /**
   * 회원 정보 수정
   * 1. DB에서 userId로 사용자 조회
   * 2. 조회 실패 시, 2차 비번 검증 실패시 예외 처리
   * 3. UserEntity.updateUser로 새로운 엔티티 생성
   * 4. DB에서 update 호출
   * 5. 동시성 문제 - lost update
   * 6. 해결방안 - 낙관적 검증으로 해결
   * @throws BusinessExceptionType.USER_NOT_EXIST,
   * @throws BusinessExceptionType.PASSWORD_MISMATCH
   */
  updateUser(dto: UpdateUserReqDto): Promise<PersistUserEntityWithCompany>;

  /**
   * 회원 정보 조회
   * 1. DB에서 userId로 사용자 조회
   * 2. 조회 실패 시 예외 처리
   * 3. 조회 성공 시 PersistUserEntityWithCompany 반환
   */
  getUser(dto: GetUserReqDto): Promise<PersistUserEntityWithCompany>;

  /**
   * 회원 정보 삭제
   * 1. DB에서 userId로 사용자 조회
   * 2. 조회 실패 시 예외 처리
   * 3. 조회 성공 시 삭제 처리
   * 4. 동시성 문제 - 팬텀 리드
   * 5. 해결 방안 - P2025로 해결
   */
  deleteUser(dto: DeleteUserReqDto): Promise<void>;

  checkUserExists(userId: number): Promise<boolean>;
}
