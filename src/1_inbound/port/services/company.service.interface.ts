import { CompanyResponseDto } from "../../responses/company/company.response";

interface BaseListQueryDto {
  page: number;
  pageSize: number;
  keyword?: string;
  searchBy?: string;
}

export interface CompanyListQueryDto extends BaseListQueryDto {
}
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

export interface UserListQueryDto extends BaseListQueryDto {
}
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
  getCompanyList(
    queryDto: CompanyListQueryDto,
  userId: number,
  ): Promise<CompanyListResponseDto>;
  getUserList(
    queryDto: UserListQueryDto,
    userId: number,
  ): Promise<UserListResponseDto>;
  createCompany(
    dto: CreateCompanyDto,
    userId: number,
  ): Promise<CompanyResponseDto>;
  updateCompany(
    companyId: number,
    dto: UpdateCompanyDto,
    userId: number,
  ): Promise<CompanyResponseDto>;
  deleteCompany(companyId: number, userId: number): Promise<void>;
}
