import { AlarmTime, ContractStatus } from "./contract.enum";

export interface MeetingEn {
  id?: number;
  contractId?: number;
  date: Date;
  alarms?: AlarmTime[];
  version?: number;
}

export type NewMeetingParams = {
  date: Date | string;
  alarms?: (AlarmTime | string)[];
};

export interface ContractDocumentEn {
  id: number;
  contractId?: number;
  fileName: string;
}

export interface ContractEn {
  id?: number;
  userId: number;
  carId: number;
  customerId: number;
  companyId: number;
  status: ContractStatus;
  resolutionDate?: Date | null;
  contractPrice: number;
  meetings?: MeetingEn[];
  contractDocuments?: ContractDocumentEn[];
  version?: number;
}

export type ContractApiInput = {
  carId: number;
  customerId: number;
  meetings?: NewMeetingParams[];
};

export interface ContractUpdateEn {
  userId?: number;
  customerId?: number;
  carId?: number;
  status?: ContractStatus;
  resolutionDate?: Date | string | null;
  contractPrice?: number;
  meetings?: NewMeetingParams[];
}

export type NewContractEn = Omit<
  ContractEn,
  | "id"
  | "status"
  | "resolutionDate"
  | "version"
  | "meetings"
  | "contractDocuments"
> & {
  meetings?: NewMeetingParams[];
};

export interface PersistContractEn extends ContractEn {
  id: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractRecord extends PersistContractEn {
  meeting?: (Omit<MeetingEn, "alarms"> & { alarms: AlarmTime[] })[];
  contractDocuments?: ContractDocumentEn[];
  user?: { id: number; name: string };
  customer?: { id: number; name: string };
  car?: { id: number; model: string };
}

export type ContractCreateData = Omit<
  ContractEn,
  "id" | "meetings" | "contractDocuments" | "version"
>;
export type ContractUpdateData = Omit<
  ContractEn,
  "id" | "meetings" | "contractDocuments" | "version"
>;
export type MeetingCreateData = Omit<MeetingEn, "id">;
