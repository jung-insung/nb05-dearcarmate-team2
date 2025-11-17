import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import {
  BusinessExceptionTable,
  BusinessExceptionType,
} from "../../../4_shared/exceptions/business.exceptions/exception-info";
import { IBcryptHashManager } from "../../port/managers/bcrypt-hash.manager.interface";

export interface NewUserEntity
  extends Omit<UserEntity, "id" | "createdAt" | "updatedAt" | "imageUrl"> {
  companyId: number;
}

export type UpdateUserEntity = Omit<
  UserEntity,
  "createdAt" | "updatedAt" | "isAdmin"
>;

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
  private _name: string;
  private _email: string;
  private _employeeNumber: string;
  private _phoneNumber: string;
  private _password: string;
  private _imageUrl?: string;
  private _isAdmin: boolean;
  private _version: number;
  private _isModified: boolean;
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

  static async updateUser(params: {
    id: number;
    name: string;
    email: string;
    employeeNumber: string;
    phoneNumber: string;
    password: string;
    imageUrl: string;
    isAdmin: boolean;
    version: number;
    bcryptHashManager: IBcryptHashManager;
  }): Promise<UpdateUserEntity> {
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
      bcryptHashManager,
    } = params;

    this.checkPasswordRule(password);
    const hashedPassword = await bcryptHashManager.hash(password);

    return new UserEntity({
      id,
      name,
      email,
      employeeNumber,
      phoneNumber,
      password: hashedPassword,
      imageUrl,
      isAdmin,
      version: version + 1,
    });
  }

  // 비즈니스 규칙
  private static checkPasswordRule(password: string): void {
    if (password.length < 15) {
      throw new BusinessException({
        type: BusinessExceptionType.EMPLOYEENUMBER_TOO_LONG,
      });
    }
  }

  // password
  async isPasswordMatch(
    InputPassword: string,
    bcryptHashManager: IBcryptHashManager,
  ) {
    return await bcryptHashManager.verifyPassword(
      InputPassword,
      this._password!,
    );
  }

  incrementVersion() {
    if (this._isModified) {
      this._version++;
    }
  }
}
