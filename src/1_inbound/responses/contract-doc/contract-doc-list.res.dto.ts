import { PersistContractDocEntity } from "../../../2_domain/entities/cotract-doc/contract-doc.entity";

export class contractDocListResDto {
  public currentPage: string;
  public totalPages: string;
  public totalItemCount: number;
  public data: PersistContractDocEntity[];

  constructor(
    pagination: {
      currentPage: string;
      totalPages: string;
      totalItemCount: number;
    },
    contractDocList: PersistContractDocEntity[]
  ) {
    this.currentPage = pagination.currentPage;
    this.totalPages = pagination.totalPages;
    this.totalItemCount = pagination.totalItemCount
    this.data = contractDocList;
  }
}