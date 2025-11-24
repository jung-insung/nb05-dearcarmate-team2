import { ContractDocListReqDto } from "../../1_inbound/requests/contract-doc-schema.request";
import { ContractDocViewReturn } from "../../3_outbound/repos/contract.repo";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export interface IContractDocService {
  getContractForDocView(dto: ContractDocListReqDto): Promise<ContractDocViewReturn>;
}

export type ContractDocPagination = {
  page: number;
  pageSize: number;
  searchBy: "contractName" | "userName" | "carNumber";
  keyword?: string;
}
export class ContractDocService extends BaseService implements IContractDocService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  async getContractForDocView(dto: ContractDocListReqDto): Promise<ContractDocViewReturn> {
    return this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDocs = await repos.contract.getContractsForDocView(dto.query)
      
      if(foundContractDocs.data.length < 1) {
        throw new BusinessException({
          type: BusinessExceptionType.CONTRACTFORDOC_NOT_EXIST
        });
      }

      return foundContractDocs;
    })
  }
}