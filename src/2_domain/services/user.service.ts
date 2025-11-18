import { IUserService } from "../../1_inbound/port/services/user.service.interface";
import {
  GetUserReqDto,
  RegisterUserReqDto,
  UpdateUserReqDto,
} from "../../1_inbound/requests/user-schema.request";
import { PersistUserEntityWithCompany } from "../../3_outbound/mappers/user.mapper";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { PersistUserEntity, UserEntity } from "../entities/user/user.entity";
import { IBcryptHashManager } from "../port/managers/bcrypt-hash.manager.interface";
import { IUnitOfWork } from "../port/unit-of-work.interface";

export class UserService implements IUserService {
  constructor(
    private _unitOfWork: IUnitOfWork,
    private _bcryptHashManager: IBcryptHashManager,
  ) {}

  async signUpUser(
    dto: RegisterUserReqDto,
  ): Promise<PersistUserEntityWithCompany> {
    const { body } = dto;

    const foundUser = await this._unitOfWork.repos.user.findUserByEmail(
      body.email,
    );
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

    const foundCompany =
      await this._unitOfWork.repos.company.findCompanyByCompanyCode(
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
      companyId: foundCompany.id,
    });

    let createdUser: PersistUserEntityWithCompany;
    try {
      createdUser = await this._unitOfWork.repos.user.create(newUser);
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

  async updateUser(
    dto: UpdateUserReqDto,
  ): Promise<PersistUserEntityWithCompany> {
    const { body } = dto;
    const id = 1; // 테스트용

    return await this._unitOfWork.do(async (txRepos) => {
      //const foundUser = await txRepos.user.findUserById(dto.userId);
      const foundUser = await txRepos.user.findUserById(id);
      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      let updatedPassword: string | undefined;

      if (body.password && body.passwordConfirmation) {
        if (body.password !== body.passwordConfirmation) {
          throw new BusinessException({
            type: BusinessExceptionType.PASSWORD_MISMATCH,
          });
        }

        if (
          !(await foundUser.isPasswordMatch(
            body.currentPassword,
            this._bcryptHashManager,
          ))
        ) {
          throw new BusinessException({
            type: BusinessExceptionType.PASSWORD_MISMATCH,
          });
        }

        updatedPassword = await foundUser.updatePassword(
          body.password,
          this._bcryptHashManager,
        );
      }

      const updatedUser = UserEntity.updateUser({
        //id: dto.userId,
        id,
        name: foundUser.name,
        email: foundUser.email,
        employeeNumber: body.employeeNumber,
        phoneNumber: body.phoneNumber,
        password: updatedPassword ? updatedPassword : body.currentPassword,
        imageUrl: body.imageUrl,
        isAdmin: foundUser.isAdmin,
        version: foundUser.version,
      });

      return await txRepos.user.update(updatedUser);
    });
  }

  async getUser(dto: GetUserReqDto): Promise<PersistUserEntityWithCompany> {
    const foundUser = await this._unitOfWork.repos.user.findUserById(
      dto.userId,
    );

    if (!foundUser) {
      throw new BusinessException({
        type: BusinessExceptionType.USER_NOT_EXIST,
      });
    }

    return foundUser;
  }

  async deleteUser(dto: GetUserReqDto): Promise<void> {
    const foundUser = await this._unitOfWork.repos.user.findUserById(
      dto.userId,
    );

    if (!foundUser) {
      throw new BusinessException({
        type: BusinessExceptionType.USER_NOT_EXIST,
      });
    }

    await this._unitOfWork.repos.user.delete(foundUser.id);
  }
}
