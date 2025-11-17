import { IUserService } from "../../1_inbound/port/services/user.service.interface";
import { RegisterUserReqDto } from "../../1_inbound/requests/user-schema.request";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { PersistUserEntity, UserEntity } from "../entities/user/user.entity";
import { IBcryptHashManager } from "../port/managers/bcrypt-hash.manager.interface";
import { IUserRepo } from "../port/repos/user.repo.interface";

export class UserService implements IUserService {
  constructor(
    private _userRepo: IUserRepo,
    private _companyRepo: ICompanyRepo,
    private _bcryptHashManager: IBcryptHashManager,
  ) {}

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
  async signUpUser(dto: RegisterUserReqDto): Promise<PersistUserEntity> {
    const { body } = dto;

    const foundUser = await this._userRepo.findUserByEmail(body.email);
    if (foundUser) {
      throw new BusinessException({
        type: BusinessExceptionType.EMAIL_DUPLICATE,
      });
    }
    if (body.password !== body.passwordConfirmation) {
      throw new BusinessException({
        type: BusinessExceptionType.SIGNUP_PASSWORD_MISMATCH,
      });
    }

    const foundCompany = await this._companyRepo.findCompanyByCompanyCode(
      body.companyCode,
    );
    if (!foundCompany) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
      });
    }

    const { name, email, employeeNumber, phoneNumber, password } = body;

    const newUser = await UserEntity.createUser({
      name,
      email,
      employeeNumber,
      phoneNumber,
      password,
      bcryptHashManager: this._bcryptHashManager,
      companyId: foundCompany.companyId,
    });

    let createdUser: PersistUserEntity;
    try {
      createdUser = await this._userRepo.create(newUser);
    } catch (err) {
      if (err instanceof TechnicalException) {
        if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL)
          throw new BusinessException({
            type: BusinessExceptionType.EMAIL_DUPLICATE,
          });
      }
      throw err;
    }
    return createdUser;
  }
}
