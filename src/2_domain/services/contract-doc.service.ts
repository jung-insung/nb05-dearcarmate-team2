import { IContractDocService } from "../../1_inbound/port/services/contractDoc.service.interface";
import {
  ContractDocDownloadReqDto,
  ContractDocDraftListReqDto,
  ContractDocListReqDto,
  ContractDocUploadReqDto,
} from "../../1_inbound/requests/contract-doc-schema.request";
import { ContractDocViewReturn } from "../../3_outbound/repos/contract.repo";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { ContractDocViewEntity } from "../entities/cotract-doc/contract-doc-view.entity";
import {
  ContractDocEntity,
  PersistContractDocEntity,
} from "../entities/cotract-doc/contract-doc.entity";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export type ContractDocPagination = {
  page: number;
  pageSize: number;
  searchBy: "contractName" | "userName" | "carNumber";
  keyword?: string;
};
export class ContractDocService
  extends BaseService
  implements IContractDocService
{
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  async getContractForDocView(
    dto: ContractDocListReqDto,
  ): Promise<ContractDocViewReturn> {
      const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDocs = await this._unitOfWork.repos.contract.getContractsForDocView(
        dto.query,
      );

      return foundContractDocs;
  }

  async getDraftContracts(
    dto: ContractDocDraftListReqDto,
  ): Promise<ContractDocViewEntity[]> {
      const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDocs = await this._unitOfWork.repos.contract.getDraftContracts();

      return foundContractDocs;
  }

  async uploadContractDoc(
    dto: ContractDocUploadReqDto,
  ): Promise<PersistContractDocEntity> {
    return this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const NewContractDoc = ContractDocEntity.createContractDoc({
        fileName: dto.body.fileName,
        filePath: dto.body.filePath,
      });

      const contractDoc = await repos.contractDoc.create(NewContractDoc);

      return contractDoc;
    },false,{
      useTransaction: true,
      isolationLevel: "ReadCommitted"
    });
  }

  async downloadcontractDocs(
    dto: ContractDocDownloadReqDto,
  ): Promise<PersistContractDocEntity> {
      const foundUser = await this._unitOfWork.repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDoc = await this._unitOfWork.repos.contractDoc.findContractDocById(
        dto.params.contractDocId,
      );

      if (!foundContractDoc) {
        throw new BusinessException({
          type: BusinessExceptionType.DOCUMENT_NOT_EXIST,
        });
      }

      return foundContractDoc;
  }
}
