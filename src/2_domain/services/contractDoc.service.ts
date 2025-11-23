import { ContractDocListReqDto } from "../../1_inbound/requests/contract-doc-schema.request";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { PersistContractDocEntity } from "../entities/cotract-doc/contract-doc.entity";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export interface IContractDocService {
  getContractDocs(dto: ContractDocListReqDto): PersistContractDocEntity
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

  async getContractDocs(dto: ContractDocListReqDto): PersistContractDocEntity {
    return this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContracts = await repos.contract.getContracts(dto.query)
      return

    })
  }
}