export interface PersistContractDocEntity extends ContractDocEntity {
  id: number;
  contractId: number;
  fileName: string;
  createdAt: Date;
  updatedat: Date;
}

export type NewContractDocEntity = Omit<
  ContractDocEntity,
  "id" | "createdAt" | "updatedAt"
>;

export class ContractDocEntity {
  private readonly _id?: number;
  private readonly _contractId: number;
  private readonly _filename: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  constructor(attrs: {
    id?: number;
    contractId: number;
    fileName: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this._id = attrs.id;
    this._contractId = attrs.contractId;
    this._filename = attrs.fileName;
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
    return this._filename;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
}
