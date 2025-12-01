export interface CompanyEn {
  id?: number;
  companyName: string;
  companyCode: string;
  userCount: number;
  version?: number;
}

export type NewCompanyEn = Omit<CompanyEn, "id" | "userCount" | "version"> & {
  userCount?: number;
};

export interface PersistCompanyEn {
  id: number;
  companyName: string;
  companyCode: string;
  userCount: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CompanyCreateData = Omit<CompanyEn, "id">;
export type CompanyUpdateData = Omit<CompanyEn, "id">;
