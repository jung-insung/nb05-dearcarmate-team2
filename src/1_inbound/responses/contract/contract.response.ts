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
    this.status = data.status;
    this.resolutionDate = data.resolutionDate;
    this.contractPrice = data.contractPrice;
    this.meetings = data.meetings;
    this.contractDocuments = data.contractDocuments;
    this.user = data.user;
    this.customer = data.customer;
    this.car = data.car;
  }
}

export type ContractListResponseDto = {
  [key in ContractStatus]?: {
    totalItemCount: number;
    data: ContractResponseDto[];
  };
};
