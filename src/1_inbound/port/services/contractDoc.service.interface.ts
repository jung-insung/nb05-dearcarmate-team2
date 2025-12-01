import { ContractDocViewEntity } from "../../../2_domain/entities/cotract-doc/contract-doc-view.entity";
import { PersistContractDocEntity } from "../../../2_domain/entities/cotract-doc/contract-doc.entity";
import { ContractDocViewReturn } from "../../../3_outbound/repos/contract.repo";
import { ContractDocDownloadReqDto, ContractDocDraftListReqDto, ContractDocListReqDto, ContractDocUploadReqDto } from "../../requests/contract-doc-schema.request";

export interface IContractDocService {
  /**
   * - 유저 인증 후 계약서들 가져오기
   * - 서로 원자성이 없고 서로 다른 테이블이므로 동시성 문제 없음
   * @throws BusinessExceptionType.USER_NOT_EXIST
   */
  getContractForDocView(
    dto: ContractDocListReqDto,
  ): Promise<ContractDocViewReturn>;

  /**
   * - 유저 인증 후 draft용 계약서들 가져오기
   * - 서로 원자성이 없고 서로 다른 테이블이므로 동시성 문제 없음
   * @throws BusinessExceptionType.USER_NOT_EXIST
   */
  getDraftContracts(
    dto: ContractDocDraftListReqDto,
  ): Promise<ContractDocViewEntity[]>;

  /**
   * - 유저 인증 후 계약서 등록
   * - 중간에 계약서가 삭제되면 Casecade 구조로 DB 에러 발생
   * - 트랜잭션을 줘서 원자성을 줌, 격리 수준 기본값 "ReadCommitted"
   * @throws BusinessExceptionType.USER_NOT_EXIST
   */
  uploadContractDoc(
    dto: ContractDocUploadReqDto,
  ): Promise<PersistContractDocEntity>;

  /**
   * - 유저 인증 후 해당 계약서 조회
   * - 원자성, 동시성 문제 없음
   * @throws BusinessExceptionType.USER_NOT_EXIST
   * @throws BusinessExceptionType.DOCUMENT_NOT_EXIST
   */
  downloadcontractDocs(
    dto: ContractDocDownloadReqDto,
  ): Promise<PersistContractDocEntity>;
}