import {
  NewCompanyEntity,
  PersistCompanyEntity,
} from "../../entities/company/company.entity";
import { PersistUserEntityWithCompany } from "../../../3_outbound/mappers/user.mapper";

export type LockType = "share" | "beta";

interface BaseListRepo {
  offset: number;
  limit: number;
  keyword?: string;
  searchBy?: string;
}

export interface CompanyListRepoDto extends BaseListRepo {}
export interface UserListRepoDto extends BaseListRepo {}

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

  findCompanies(query: CompanyListRepoDto): Promise<{
    companies: PersistCompanyEntity[];
    totalItemCount: number;
  }>;

  findUsers(query: UserListRepoDto): Promise<{
    users: PersistUserEntityWithCompany[];
    totalItemCount: number;
  }>;

  createCompany(entity: NewCompanyEntity): Promise<PersistCompanyEntity>;

  updateCompany(entity: PersistCompanyEntity): Promise<PersistCompanyEntity>;

  deleteCompany(companyId: number): Promise<void>;
}
