import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";
import { IBcryptHashManager } from "../../port/managers/bcrypt-hash.manager.interface";

export interface NewUserEntity
  extends Omit<UserEntity, "id" | "createdAt" | "updatedAt" | "imageUrl"> {
  companyId: number;
}

export type UpdateUserEntity = Omit<UserEntity, "createdAt" | "updatedAt">;

export interface PersistUserEntity extends UserEntity {
  id: number;
  companyId: number;
  employeeNumber: string;
  phoneNumber: string;
  imageUrl: string;
  isAdmin: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  private readonly _id?: number;
  private readonly _companyId?: number;
  private readonly _name: string;
  private readonly _email: string;
  private _employeeNumber: string;
  private _phoneNumber: string;
  private _password: string;
  private _imageUrl?: string;
  private _isAdmin: boolean;
  private _version: number;
  private _isModified: boolean;
  private _refreshToken?: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    companyId?: number;
    name: string;
    email: string;
    employeeNumber: string;
    phoneNumber: string;
    imageUrl?: string;
    isAdmin: boolean;
    password: string;
    version: number;
    refreshToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = attrs.id;
    this._companyId = attrs.companyId;
    this._name = attrs.name;
    this._email = attrs.email;
    this._employeeNumber = attrs.employeeNumber;
    this._phoneNumber = attrs.phoneNumber;
    this._password = attrs.password;
    this._imageUrl = attrs.imageUrl;
    this._isAdmin = attrs.isAdmin;
    this._version = attrs.version;
    this._isModified = false;
    this._refreshToken = attrs.refreshToken;
    this._createdAt = attrs.createdAt;
    this._updatedAt = attrs.updatedAt;
  }

  get id() {
    return this._id;
  }
  get companyId() {
    return this._companyId;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get employeeNumber() {
    return this._employeeNumber;
  }
  get phoneNumber() {
    return this._phoneNumber;
  }
  get password() {
    return this._password;
  }
  get imageUrl() {
    return this._imageUrl;
  }
  get isAdmin() {
    return this._isAdmin;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get version() {
    return this._version;
  }
  get isModified() {
    return this._isModified;
  }
  get refreshToken() {
    return this._refreshToken;
  }

  // Factory(도장 찍기)
  static async createUser(params: {
    name: string;
    email: string;
    employeeNumber: string;
    phoneNumber: string;
    password: string;
    bcryptHashManager: IBcryptHashManager;
    companyId: number;
  }): Promise<NewUserEntity> {
    const {
      name,
      email,
      employeeNumber,
      phoneNumber,
      password,
      companyId,
      bcryptHashManager,
    } = params;

    this.checkPasswordRule(password);
    const hashedPassword = await bcryptHashManager.hash(password);

    return new UserEntity({
      companyId,
      name,
      email,
      employeeNumber,
      phoneNumber,
      password: hashedPassword,
      isAdmin: false,
      version: 1,
    }) as NewUserEntity;
  }

  static updateUser(params: {
    id: number;
    name: string;
    email: string;
    employeeNumber: string;
    phoneNumber: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    version: number;
  }): UpdateUserEntity {
    const {
      id,
      name,
      email,
      employeeNumber,
      phoneNumber,
      password,
      imageUrl,
      version,
      isAdmin,
    } = params;

    return new UserEntity({
      id,
      name,
      email,
      employeeNumber,
      phoneNumber,
      password,
      imageUrl,
      isAdmin,
      version,
    }) as UpdateUserEntity;
  }

  // 비즈니스 규칙
  private static checkPasswordRule(password: string): void {
    if (password.length > 20) {
      throw new BusinessException({
        type: BusinessExceptionType.PASSWORD_TOO_LONG,
      });
    }
  }

  // password
  async isPasswordMatch(
    inputPassword: string,
    bcryptHashManager: IBcryptHashManager,
  ): Promise<boolean> {
    return await bcryptHashManager.compare(inputPassword, this._password);
  }

  async updatePassword(
    newPassword: string,
    bcryptHashManager: IBcryptHashManager,
  ): Promise<string> {
    UserEntity.checkPasswordRule(newPassword);

    return await bcryptHashManager.hash(newPassword);
  }

  // refreshToken
  async updateRefreshToken(
    refreshToken: string,
    bcryptHashManager: IBcryptHashManager,
  ): Promise<void> {
    this._refreshToken = await bcryptHashManager.hash(refreshToken);
  }

  async isRefreshTokenMatch(
    refreshToken: string,
    bcryptHashManager: IBcryptHashManager,
  ): Promise<boolean> {
    return await bcryptHashManager.compare(refreshToken, this.refreshToken!);
  }
}
