import { ContractMapper } from "../../3_outbound/mappers/contract.mapper";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { ContractEntity } from "../entities/contract/contract.entity";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export class ContractService extends BaseService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  async updateContract(params: { contractId: number; dto: UpdateContractReq }) {
    const { contractId, dto } = params;

    return (
      await this._unitOfWork.do(async (txRepos) => {
        const contract = await txRepos.contract.findById(contractId);

        if (!contract) {
          throw new BusinessException({
            type: BusinessExceptionType.CONTRACT_NOT_EXIST,
          });
        }
        const entity = ContractEntity.createPersist(contract);

        entity.update(dto);

        const updateData = entity.toUpdateData();

        try {
          const updated = await txRepos.contract.updateContract(
            contractId,
            updateData,
          );

          return ContractMapper.toResponse(updated);
        } catch {}
      }),
      true,
      false
    );
  }
}
