import { PersistUserEntity } from "../../../2_domain/entities/user/user.entity";
import {
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
   * 5. 동시성 문제 - 팬텀 리드, Insert Race Condition 문제
   *      UNIQUE 제약 조건으로 해결
   * @param dto 회원가입 요청 데이터
   * @returns PersistUserEntity
   */
  signUpUser(dto: RegisterUserReqDto): Promise<PersistUserEntity>;

  updateUser(dto: UpdateUserReqDto): Promise<PersistUserEntity>;
}
