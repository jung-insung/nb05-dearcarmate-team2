export interface PersistContractDocEntity extends ContractDocEntity {
  id: number;
  contractId: number;
  fileName: string;
  filePath: string;
  createdAt: Date;
  updatedat: Date;
}

<<<<<<< HEAD
export type NewContractDocEntity = Omit<
  ContractDocEntity,
  "id" | "createdAt" | "updatedAt"
>;
=======
export type NewContractDocEntity = Omit<ContractDocEntity, "id" | "createdAt" | "updatedAt" | "contractId">;
>>>>>>> 8725acb ([feat] 계약서 api 나머지 구현)

export class ContractDocEntity {
  private readonly _id?: number;
  private readonly _contractId?: number;
  private readonly _fileName: string;
  private readonly _filePath: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    contractId?: number;
    fileName: string;
    filePath: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = attrs.id;
    this._contractId = attrs.contractId;
    this._fileName = attrs.fileName;
    this._filePath = attrs.filePath;
    this._createdAt = attrs.createdAt;
    this._updatedAt = attrs.updatedAt;
  }

  get id() {
    return this._id;
  }
  get contractId() {
    return this._contractId;
  }
  get fileName() {
    return this._fileName;
  }
  get filePath() {
    return this._filePath;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
<<<<<<< HEAD
}
=======

  static createContractDoc(params:{
    fileName: string;
    filePath: string;
  }): NewContractDocEntity {
    const {filePath, fileName} = params;

    return new ContractDocEntity({
      fileName,
      filePath,
    }) as NewContractDocEntity
  }
}
>>>>>>> 8725acb ([feat] 계약서 api 나머지 구현)
