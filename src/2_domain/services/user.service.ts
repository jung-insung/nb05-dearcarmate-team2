import { IUserService } from "../../1_inbound/port/services/user.service.interface";
import {
  DeleteUserReqDto,
  GetUserReqDto,
  RegisterUserReqDto,
  UpdateUserReqDto,
} from "../../1_inbound/requests/user-schema.request";
import { PersistUserEntityWithCompany } from "../../3_outbound/mappers/user.mapper";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { PersistCompanyEntity } from "../entities/company/company.entity";
import { NewAdminEntity, NewUserEntity, PersistUserEntity, UserEntity } from "../entities/user/user.entity";
import { IBcryptHashManager } from "../port/managers/bcrypt-hash.manager.interface";
import { IUnitOfWork } from "../port/unit-of-work.interface";

export class UserService implements IUserService {
  constructor(
    private _unitOfWork: IUnitOfWork,
    private _bcryptHashManager: IBcryptHashManager,
  ) { }

  async signUpUser(
    dto: RegisterUserReqDto,
  ): Promise<PersistUserEntityWithCompany> {
    const { body } = dto;

    return await this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserByEmail(body.email);
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


      const { name, email, employeeNumber, phoneNumber, password } = body;

      if (!body.companyCode && !body.companyName) {
        //관리자 계정
        const newUser = await UserEntity.createAdmin({
          name,
          email,
          employeeNumber,
          phoneNumber,
          password,
          bcryptHashManager: this._bcryptHashManager,
        });
        try {
          return await repos.user.create(newUser);
        } catch (err) {
          if (err instanceof TechnicalException) {
            if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL)
              throw new BusinessException({
                type: BusinessExceptionType.EMAIL_DUPLICATE,
              })
          }
          throw err;
        }
      } else {
        // 일반 유저
        const foundCompany = await repos.company.findCompanyByCompanyCode(
          body.companyCode!,
        );
        if (!foundCompany) {
          throw new BusinessException({
            type: BusinessExceptionType.COMPANY_NOT_EXIST,
          });
        }
        const newUser = await UserEntity.createUser({
          name,
          email,
          employeeNumber,
          phoneNumber,
          password,
          bcryptHashManager: this._bcryptHashManager,
          companyId: foundCompany.id,
        });

        foundCompany.increaseUserCount();
        try {
          await repos.company.updateCompany(foundCompany);
          return await repos.user.create(newUser);
        } catch (err) {
          if (err instanceof TechnicalException) {
            if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL)
              throw new BusinessException({
                type: BusinessExceptionType.EMAIL_DUPLICATE,
              })
          }
          throw err;
        }
      }
    });
  }

  async updateUser(
    dto: UpdateUserReqDto,
  ): Promise<PersistUserEntityWithCompany> {
    const { body } = dto;

    return await this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);
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
        id: dto.userId,
        name: foundUser.name,
        email: foundUser.email,
        employeeNumber: body.employeeNumber,
        phoneNumber: body.phoneNumber,
        password: updatedPassword ?? foundUser.password,
        imageUrl: body.imageUrl,
        isAdmin: foundUser.isAdmin,
        version: foundUser.version,
      });

      return await repos.user.update(updatedUser);
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

  async deleteUser(dto: DeleteUserReqDto): Promise<void> {
    await this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.params.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundAdmin = await repos.user.findUserById(dto.userId);

      if (!foundAdmin?.isAdmin) {
        throw new BusinessException({
          type: BusinessExceptionType.NOT_ADMIN
        })
      }

      const foundCompany = await repos.company.findById(foundUser.companyId);

      if (foundCompany) {
        foundCompany.decreaseUserCount();
        await repos.company.updateCompany(foundCompany);
      }

      await repos.user.delete(foundUser.id);
    });
  }
}
