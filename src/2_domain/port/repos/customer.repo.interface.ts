import {
  NewCustomerEntity,
  PersistCustomerEntites,
  PersistCustomerEntity,
  UpdateCustomerEntity,
} from "../../entities/customer/customer.entity";

export interface ICustomerRepo {
  findById(id: number): Promise<PersistCustomerEntity | null>;

  findAll(params: {
    companyId: number;
    page: number;
    pageSize: number;
    searchBy?: "name" | "email";
    keyword?: string;
  }): Promise<PersistCustomerEntites>;

  create(entity: NewCustomerEntity): Promise<PersistCustomerEntity>;

  /**
   *
   * @throws {TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED}
   */
  update(
    id: number,
    entity: UpdateCustomerEntity,
  ): Promise<PersistCustomerEntity>;

  /**
   *
   * @throws {TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED}
   */
  delete(id: number): Promise<void>;
}
