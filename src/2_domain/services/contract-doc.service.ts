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

export interface IContractDocService {
  getContractForDocView(
    dto: ContractDocListReqDto,
  ): Promise<ContractDocViewReturn>;
  getDraftContracts(
    dto: ContractDocDraftListReqDto,
  ): Promise<ContractDocViewEntity[]>;
  uploadContractDoc(
    dto: ContractDocUploadReqDto,
  ): Promise<PersistContractDocEntity>;
  downloadcontractDocs(
    dto: ContractDocDownloadReqDto,
  ): Promise<PersistContractDocEntity>;
}

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
    return this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDocs = await repos.contract.getContractsForDocView(
        dto.query,
      );

      if (foundContractDocs.data.length < 1) {
        throw new BusinessException({
          type: BusinessExceptionType.CONTRACTFORDOC_NOT_EXIST,
        });
      }

      return foundContractDocs;
    });
  }

  async getDraftContracts(
    dto: ContractDocDraftListReqDto,
  ): Promise<ContractDocViewEntity[]> {
    return this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDocs = await repos.contract.getDraftContracts();

      return foundContractDocs;
    });
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
    });
  }

  async downloadcontractDocs(
    dto: ContractDocDownloadReqDto,
  ): Promise<PersistContractDocEntity> {
    return this._unitOfWork.do(async (repos) => {
      const foundUser = await repos.user.findUserById(dto.userId);

      if (!foundUser) {
        throw new BusinessException({
          type: BusinessExceptionType.USER_NOT_EXIST,
        });
      }

      const foundContractDoc = await repos.contractDoc.findContractDocById(dto.params.contractDocId);

      if (!foundContractDoc) {
        throw new BusinessException({
          type: BusinessExceptionType.DOCUMENT_NOT_EXIST,
        });
      }

      return foundContractDoc;
    });
  }
}
