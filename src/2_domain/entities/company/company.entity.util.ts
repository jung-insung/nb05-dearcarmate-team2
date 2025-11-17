export interface CompanyEn {
	id?: number;
	companyName: string;
	companyCode: string;
	userCount: number;
	version?: number;
}

export type NewCompanyEn = Omit<CompanyEn, "id" | "userCount" | "version"> & { userCount?: number; };

export interface PersistCompanyEn {
	id: number;
	companyName: string;
	companyCode: string;
	userCount: number;
	version: number;
	createdAt: Date;
	updatedAt: Date;
}

export type CompanyCreateData = Pick<CompanyEn, "companyName" | "companyCode" | "userCount" | "version">;
export type CompanyUpdateData = Pick<CompanyEn, "companyName" | "companyCode" | "userCount" | "version">;
