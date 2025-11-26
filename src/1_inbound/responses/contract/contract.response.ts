import { ContractStatus } from "../../../2_domain/entities/contract/contract.enum";

export class ContractResponseDto {
  id: number;
  status: string;
  resolutionDate: Date | null;
  contractPrice: number;
  meetings: { date: Date; alarms: Date[] }[];
  contractDocuments: { id: number; fileName: string }[];
  user: { id: number; name?: string };
  customer: { id: number; name?: string };
  car: { id: number; model?: string };

  constructor(data: any) {
    this.id = data.id;
    this.car = data.car;
    this.customer = data.customer;
    this.user = data.user;
    this.meetings = data.meetings;
    this.contractPrice = data.contractPrice;
    this.resolutionDate = data.resolutionDate;
    this.status = data.status;
    this.contractDocuments = data.contractDocuments;
  }
}

export type ContractListResponseDto = {
  [key in ContractStatus]?: {
    totalItemCount: number;
    data: ContractResponseDto[];
  };
};
