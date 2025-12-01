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
   * 고객 정보 등록
   */
  registCustomer(params: {
    dto: RegistCustomerReq;
    userId: number;
  }): Promise<CustomerResponseDto>;

  /**
   *
   * 고객 목록 조회
   */
  getCustomers(params: {
    userId: number;
    page: number;
    pageSize: number;
    searchBy?: "name" | "email";
    keyword?: string;
  }): Promise<CustomerListResponseDto>;

  /**
   * 고객 상세정보 조회
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
   * 고객 삭제
   * @throws {BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE} 고객이 이미 삭제되었음
   */
  deleteCustomer(customerId: number): Promise<void>;

  /**
   *
   */
  uploadCustomers(params: { userId: number; req: any }): Promise<void>;
}
