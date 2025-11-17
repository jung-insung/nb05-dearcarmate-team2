import {
	CompanyEntity,
	NewCompanyEntity,
	PersistCompanyEntity,
} from "../../2_domain/entities/company/company.entity";
import {
	PersistCompanyEn,
	CompanyCreateData,
	CompanyUpdateData,
} from "../../2_domain/entities/company/company.entity.util";


export class CompanyMapper {
	static toCreateData(entity: NewCompanyEntity): { company: CompanyCreateData } {
		return {
			company: entity.toCreateData(),
		};
	}

	static toUpdateData(entity: PersistCompanyEntity): { company: CompanyUpdateData } {
		return {
			company: entity.toUpdateData(),
		};
	}
	
	static toPersistEntity(record: PersistCompanyEn): PersistCompanyEntity {
		return CompanyEntity.createPersistCom(record) as PersistCompanyEntity;
	}
}
