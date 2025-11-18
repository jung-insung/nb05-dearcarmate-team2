import { CompanyResponseDto } from "../../responses/company/company.response";

export interface CreateCompanyDto {
  companyName: string;
  companyCode: string;
}
export interface UpdateCompanyDto {
  companyName?: string;
  companyCode?: string;
}

export interface ICompanyService {
  createCompany(dto: CreateCompanyDto): Promise<CompanyResponseDto>;
  updateCompany(
    companyId: number,
    dto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto>;
  deleteCompany(companyId: number): Promise<void>;
}
