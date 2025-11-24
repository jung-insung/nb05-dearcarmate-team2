import { ContractDocViewEntity } from "../../../2_domain/entities/cotract-doc/contract-doc-view.entity";
import { ContractDocViewReturn } from "../../../3_outbound/repos/contract.repo";

export type ContractDocViewDto = {
  id: number;
  contractName: string;
  resolutionDate: Date | null;
  documentCount: number;
  userName: string;
  carNumber: string;
  documents: { id: number; fileName: string }[];
};

export class contractDocListResDto {
  public currentPage: number;
  public totalPages: number;
  public totalItemCount: number;
  public data: ContractDocViewDto[];

  constructor(
    contractDocs :  ContractDocViewReturn
  ) {
    this.currentPage = contractDocs.pagination.currentPage;
    this.totalPages = contractDocs.pagination.totalPages;
    this.totalItemCount = contractDocs.pagination.totalItemCount
    this.data = contractDocs.data.map(contractDoc => ({
      id: contractDoc.id,
      contractName: contractDoc.contractName,
			resolutionDate: contractDoc.resolutionDate,
			documentCount : contractDoc.documentCount,
			userName: contractDoc.userName,
			carNumber: contractDoc.carNumber,
      documents: contractDoc.documents.map(document => ({
        id: document.id,
        fileName: document.fileName
      }))
    }));
  }
}