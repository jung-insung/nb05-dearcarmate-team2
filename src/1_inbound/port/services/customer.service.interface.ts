import {
  RegistCustomerReq,
  UpdateCustomerReq,
} from "../../requests/customer-schema.request";
import {
  CustomerListResponseDto,
  CustomerResponseDto,
} from "../../responses/customer/customer.response";

export interface ICustomerService {
  /**
   *
   */
  registCustomer(params: {
    dto: RegistCustomerReq;
    companyId: number;
  }): Promise<CustomerResponseDto>;

  /**
   *
   */
  getCustomers(params: {
    companyId: number;
    page: number;
    pageSize: number;
    searchBy?: "name" | "email";
    keyword?: string;
  }): Promise<CustomerListResponseDto>;

  /**
   *
   */
  getCustomer(customerId: number): Promise<CustomerResponseDto>;

  /**
   *
   * @throws {BusinessExceptionType.CUSTOMER_NOT_EXIST}
   * @throws {BusinessExceptionType.CUSTOMER_DATA_CHANGED}
   */
  updateCustomer(params: {
    customerId: number;
    dto: UpdateCustomerReq;
  }): Promise<CustomerResponseDto>;

  /**
   *
   * @throws {BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE}
   */
  deleteCustomer(customerId: number): Promise<void>;

  /**
   *
   */
  uploadCustomers(params: { companyId: number; req: any }): Promise<void>;
}
