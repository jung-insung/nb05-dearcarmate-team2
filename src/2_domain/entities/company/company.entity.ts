import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";
import {
  CompanyEn,
  NewCompanyEn,
  PersistCompanyEn,
  CompanyCreateData,
  CompanyUpdateData,
} from "./company.entity.util";

export type NewCompanyEntity = CompanyEntity;
export type PersistCompanyEntity = CompanyEntity & { readonly id: number };

export class CompanyEntity {
  private readonly _id?: number;
  private _companyName: string;
  private _companyCode: string;
  private _userCount: number;
  private _version: number;

  constructor(attrs: CompanyEn) {
    this._id = attrs.id;
    this._companyName = attrs.companyName;
    this._companyCode = attrs.companyCode;
    this._userCount = attrs.userCount;
    this._version = attrs.version ?? 1;
  }

  get id(): number | undefined {
    return this._id;
  }
  get companyName(): string {
    return this._companyName;
  }
  get companyCode(): string {
    return this._companyCode;
  }
  get userCount(): number {
    return this._userCount;
  }
  get version(): number {
    return this._version;
  }

  static createNewCom(params: NewCompanyEn): CompanyEntity {
    const { companyName, companyCode } = params;

    this.checkCompanyNameRule(companyName);
    this.checkCompanyCodeRule(companyCode);

    return new CompanyEntity({
      companyName,
      companyCode,
      userCount: 0,
    });
  }

  static createPersistCom(attrs: PersistCompanyEn): CompanyEntity {
    const { id, companyName, companyCode, userCount, version } = attrs;

    return new CompanyEntity({
      id,
      companyName,
      companyCode,
      userCount,
      version,
    });
  }

  toCreateData(): CompanyCreateData {
    return {
      companyName: this._companyName,
      companyCode: this._companyCode,
      userCount: this._userCount,
      version: this._version,
    };
  }

  toUpdateData(): CompanyUpdateData {
    return {
      companyName: this._companyName,
      companyCode: this._companyCode,
      userCount: this._userCount,
      version: this._version,
    };
  }

  updateInfo(params: { companyName?: string; companyCode?: string }): void {
    let isUpdated = false;

    if (params.companyName) {
      CompanyEntity.checkCompanyNameRule(params.companyName);
      this._companyName = params.companyName;
      isUpdated = true;
    }
    if (params.companyCode) {
      CompanyEntity.checkCompanyCodeRule(params.companyCode);
      this._companyCode = params.companyCode;
      isUpdated = true;
    }
    if (isUpdated) {
      this._version++;
    }
  }

  private static checkCompanyNameRule(companyName: string) {
    if (companyName.length <= 1) {
      throw new BusinessException({
        type: BusinessExceptionType.BAD_REQUEST,
      });
    }
  }
  private static checkCompanyCodeRule(companyCode: string) {
    if (companyCode.length <= 1) {
      throw new BusinessException({
        type: BusinessExceptionType.BAD_REQUEST,
      });
    }
  }

  increaseUserCount(): void {
    this._userCount++;
    this._version++;
  }
  decreaseUserCount(): void {
    if (this._userCount <= 0) {
      return;
    }
    this._userCount--;
    this._version++;
  }
}
