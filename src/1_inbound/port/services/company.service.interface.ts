import { CompanyResponseDto } from "../../responses/company/company.response";

interface BaseListQueryDto {
	page: number;
	pageSize: number;
	keyword?: string;
  searchBy?: string;
}

export interface CompanyListQueryDto extends BaseListQueryDto {}
export interface CompanyItemDto {
	id: number;
	companyName: string;
	companyCode: string;
	userCount: number;
}
export interface CompanyListResponseDto {
	currentPage: number;
	totalPages: number;
	totalItemCount: number;
	data: CompanyItemDto[];
}

export interface UserListQueryDto extends BaseListQueryDto {}
export interface UserItemDto {
	id: number;
	name: string;
	email: string;
	employeeNumber: string;
	phoneNumber: string;
	company: {
		companyName: string;
	};
}
export interface UserListResponseDto {
	currentPage: number;
	totalPages: number;
	totalItemCount: number;
	data: UserItemDto[];
}

export interface CreateCompanyDto {
  companyName: string;
  companyCode: string;
}
export interface UpdateCompanyDto {
  companyName?: string;
  companyCode?: string;
}

export interface ICompanyService {
  getCompanyList(queryDto: CompanyListQueryDto): Promise<CompanyListResponseDto>;
	getUserList(queryDto: UserListQueryDto): Promise<UserListResponseDto>;
  createCompany(dto: CreateCompanyDto): Promise<CompanyResponseDto>;
  updateCompany(
    companyId: number,
    dto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto>;
  deleteCompany(companyId: number): Promise<void>;
}
