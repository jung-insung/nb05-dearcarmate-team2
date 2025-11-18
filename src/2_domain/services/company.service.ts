import {
  ICompanyService,
  CreateCompanyDto,
  UpdateCompanyDto,
} from "../../1_inbound/port/services/company.service.interface";
import { ICompanyRepo } from "../../2_domain/port/repos/company.repo.interface";
import { CompanyEntity } from "../../2_domain/entities/company/company.entity";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { CompanyResponseDto } from "../../1_inbound/response/company.response";

export class CompanyService implements ICompanyService {
  private _companyRepo;

  constructor(companyRepo: ICompanyRepo) {
    this._companyRepo = companyRepo;
  }

  async createCompany(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    const newEntity = CompanyEntity.createNewCom({
      companyName: dto.companyName,
      companyCode: dto.companyCode,
    });

    const createdEntity = await this._companyRepo.createCompany(newEntity);

    return {
      id: createdEntity.id,
      companyName: createdEntity.companyName,
      companyCode: createdEntity.companyCode,
      userCount: createdEntity.userCount,
    };
  }

  async updateCompany(
    companyId: number,
    dto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto> {
    const entity = await this._companyRepo.findById(companyId);

    if (!entity) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
      });
    }

    entity.updateInfo(dto);

    const updatedEntity = await this._companyRepo.updateCompany(entity);

    return {
      id: updatedEntity.id,
      companyName: updatedEntity.companyName,
      companyCode: updatedEntity.companyCode,
      userCount: updatedEntity.userCount,
    };
  }

  async deleteCompany(companyId: number): Promise<void> {
    const entity = await this._companyRepo.findById(companyId);

    if (!entity) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
      });
    }

    await this._companyRepo.deleteCompany(companyId);
  }
}
