import { IUserService } from "../../1_inbound/port/services/user.service.interface";
import { RegisterUserReqDto, UpdateUserReqDto } from "../../1_inbound/requests/user-schema.request";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { PersistUserEntity, UserEntity } from "../entities/user/user.entity";
import { IBcryptHashManager } from "../port/managers/bcrypt-hash.manager.interface";
import { IUserRepo } from "../port/repos/user.repo.interface";
import { ICompanyRepo } from "../port/repos/company.repo.interface";

export class UserService implements IUserService {
  constructor(
    private _userRepo: IUserRepo,
    private _companyRepo: ICompanyRepo,
    private _bcryptHashManager: IBcryptHashManager,
  ) {}

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

  async updateUser(dto: UpdateUserReqDto) : Promise<PersistUserEntity>{
    const foundUser = await this._userRepo.findUserById(dto.userId);

  }
}
