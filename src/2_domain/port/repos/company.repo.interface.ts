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

  createCompany(entity: NewCompanyEntity): Promise<PersistCompanyEntity>;

  updateCompany(entity: PersistCompanyEntity): Promise<PersistCompanyEntity>;

  deleteCompany(companyId: number): Promise<void>;
}
