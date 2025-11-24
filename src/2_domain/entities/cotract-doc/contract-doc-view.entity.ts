export class ContractDocViewEntity {
  private readonly _contractId: number;
  private readonly _contractName: string;
  private readonly _resolutionDate: Date | null;
  private readonly _documentCount: number;
  private readonly _userName: string;
  private readonly _carNumber: string;
  private readonly _documents: { id: number; fileName: string }[];

  constructor(params: {
    contractId: number;
    contractName: string;
    resolutionDate: Date | null;
    documentCount: number;
    userName: string;
    carNumber: string;
    documents: { id: number; fileName: string }[];
  }) {
    this._contractId = params.contractId;
    this._contractName = params.contractName;
    this._resolutionDate = params.resolutionDate;
    this._documentCount = params.documentCount;
    this._userName = params.userName;
    this._carNumber = params.carNumber;
    this._documents = params.documents;
  }

  get id() {
    return this._contractId;
  }
  get contractName() {
    return this._contractName;
  }
  get resolutionDate() {
    return this._resolutionDate;
  }
  get documentCount() {
    return this._documentCount;
  }
  get userName() {
    return this._userName;
  }
  get carNumber() {
    return this._carNumber;
  }
  get documents() {
    return this._documents;
  }
}