import {
  ICompanyService,
	CompanyListQueryDto,
	CompanyListResponseDto,
	CompanyItemDto,
	UserListQueryDto,
	UserListResponseDto,
	UserItemDto,
  CreateCompanyDto,
  UpdateCompanyDto,
} from "../../1_inbound/port/services/company.service.interface";
import { CompanyResponseDto } from "../../1_inbound/responses/company/company.response";
import { CompanyEntity } from "../../2_domain/entities/company/company.entity";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { IUnitOfWork } from "../port/unit-of-work.interface";

export class CompanyService implements ICompanyService {
  constructor(private _unitOfWork: IUnitOfWork) {}

	async getCompanyList(
		queryDto: CompanyListQueryDto,
	): Promise<CompanyListResponseDto> {
		return await this._unitOfWork.do(async (txRepos) => {
			const { page, pageSize, keyword, searchBy } = queryDto;
			const limit = pageSize;
			const offset = (page - 1) * pageSize;
			
			const { companies, totalItemCount } =
				await txRepos.company.findCompanies({
					offset,
					limit,
					keyword,
					searchBy,
				});
			
			const totalPages = Math.max(1, Math.ceil(totalItemCount / limit));
			
			const companyDtos: CompanyItemDto[] = companies.map((entity) => {
				return {
					id: entity.id,
					companyName: entity.companyName,
					companyCode: entity.companyCode,
					userCount: entity.userCount,
				};
			});

			return {
				currentPage: page,
				totalPages: totalPages,
				totalItemCount: totalItemCount,
				data: companyDtos,
			};
		});
	}

	async getUserList(
		queryDto: UserListQueryDto,
	): Promise<UserListResponseDto> {
		return await this._unitOfWork.do(async (txRepos) => {
			const { page, pageSize, keyword, searchBy } = queryDto;

			const limit = pageSize;
			const offset = (page - 1) * pageSize;

			const { users, totalItemCount } = await txRepos.company.findUsers({
				offset,
				limit,
				keyword,
				searchBy,
			});

			const totalPages = Math.max(1, Math.ceil(totalItemCount / limit));

			const userDtos: UserItemDto[] = users.map((entity) => {			
				return {
					id: entity.id,
					name: entity.name,
					email: entity.email,
					employeeNumber: entity.employeeNumber,
					phoneNumber: entity.phoneNumber,
					company: {
						companyName: entity.company.companyName,
					},
				};
			});

			return {
				currentPage: page,
				totalPages: totalPages,
				totalItemCount: totalItemCount,
				data: userDtos,
			};
		});
	}

  async createCompany(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    const newEntity = CompanyEntity.createNewCom({
      companyName: dto.companyName,
      companyCode: dto.companyCode,
    });

    let createdEntity: CompanyResponseDto;
    try {
      createdEntity =
        await this._unitOfWork.repos.company.createCompany(newEntity);
    } catch (err) {
      if (err instanceof TechnicalException) {
        if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME) {
          throw new BusinessException({
            type: BusinessExceptionType.COMPANY_NAME_DUPLICATE,
          });
        }
        if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE) {
          throw new BusinessException({
            type: BusinessExceptionType.COMPANY_CODE_DUPLICATE,
          });
        }
      }

      throw err;
    }

    return {
      id: createdEntity.id,
      companyName: createdEntity.companyName,
      companyCode: createdEntity.companyCode,
      userCount: createdEntity.userCount,
    };
  }

  async updateCompany(
<<<<<<< Updated upstream
		companyId: number,
		dto: UpdateCompanyDto,
	): Promise<CompanyResponseDto> {
		return await this._unitOfWork.do(async (txRepos) => {
			const entity = await txRepos.company.findById(companyId, "beta");
			if (!entity) {
				throw new BusinessException({
					type: BusinessExceptionType.COMPANY_NOT_EXIST,
				});
			}
			
			entity.updateInfo(dto);
			
			let updatedEntity: CompanyResponseDto;
			try {
				updatedEntity = await txRepos.company.updateCompany(entity);
			} catch (err) {
				if (err instanceof TechnicalException) {
					if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME) {
						throw new BusinessException({
							type: BusinessExceptionType.COMPANY_NAME_DUPLICATE,
						});
					}
					if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE) {
						throw new BusinessException({
							type: BusinessExceptionType.COMPANY_CODE_DUPLICATE,
						});
					}
					if (err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
						throw new BusinessException({
							type: BusinessExceptionType.BAD_REQUEST,
						});
					}
				}
				
				throw err;
			}
			
			return {
				id: updatedEntity.id,
				companyName: updatedEntity.companyName,
				companyCode: updatedEntity.companyCode,
				userCount: updatedEntity.userCount,
			};
		});
	}
=======
    companyId: number,
    dto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto> {
    return await this._unitOfWork.do(async (txRepos) => {
      const entity = await txRepos.company.findById(companyId);
      if (!entity) {
        throw new BusinessException({
          type: BusinessExceptionType.COMPANY_NOT_EXIST,
        });
      }

      entity.updateInfo(dto);

      let updatedEntity: CompanyResponseDto;
      try {
        updatedEntity = await txRepos.company.updateCompany(entity);
      } catch (err) {
        if (err instanceof TechnicalException) {
          if (
            err.type === TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_NAME
          ) {
            throw new BusinessException({
              type: BusinessExceptionType.COMPANY_NAME_DUPLICATE,
            });
          }
          if (
            err.type === TechnicalExceptionType.UNIQUE_VIOLATION_COMPANY_CODE
          ) {
            throw new BusinessException({
              type: BusinessExceptionType.COMPANY_CODE_DUPLICATE,
            });
          }
          if (err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
            throw new BusinessException({
              type: BusinessExceptionType.BAD_REQUEST,
            });
          }
        }

        throw err;
      }

      return {
        id: updatedEntity.id,
        companyName: updatedEntity.companyName,
        companyCode: updatedEntity.companyCode,
        userCount: updatedEntity.userCount,
      };
    });
  }
>>>>>>> Stashed changes

  async deleteCompany(companyId: number): Promise<void> {
    const entity = await this._unitOfWork.repos.company.findById(companyId);

    if (!entity) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
      });
    }

    await this._unitOfWork.repos.company.deleteCompany(companyId);
  }
}
