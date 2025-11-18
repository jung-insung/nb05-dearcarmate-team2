import {
  NewCompanyEntity,
  PersistCompanyEntity,
} from "../../entities/company/company.entity";

export type LockType = "share" | "beta";

export interface ICompanyRepo {
  findById(
    companyId: number,
    lockType?: LockType,
  ): Promise<PersistCompanyEntity | null>;

  /**
   *  회원 가입 시에만 사용하므로 락을 고려할 필요가 없음
   */
  findCompanyByCompanyCode(
    companyCode: string,
  ): Promise<PersistCompanyEntity | null>;

  createCompany(entity: NewCompanyEntity): Promise<PersistCompanyEntity>;

  updateCompany(entity: PersistCompanyEntity): Promise<PersistCompanyEntity>;

  deleteCompany(companyId: number): Promise<void>;
}
