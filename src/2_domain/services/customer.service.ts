import {
  RegistCustomerReq,
  UpdateCustomerReq,
} from "../../1_inbound/requests/customer-schema.request";
import { CustomerResponseDto } from "../../1_inbound/responses/customer/customer.response";
import { CustomerMapper } from "../../3_outbound/mappers/customer.mapper";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import {
  TechnicaalExceptionTable,
  TechnicalExceptionType,
} from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { IUnitOfWork } from "../port/unit-of-work.interface";

export interface ICustomerService {
  registCustomer(
    dto: RegistCustomerReq,
    companyId: number,
  ): Promise<CustomerResponseDto>;
  
  /**
   * @param customerId
   * @param dto
   * @throws {BusinessExceptionType.CUSTOMER_NOT_EXIST}
   * @throws {BusinessExceptionType.CUSTOMER_DATA_CHANGED}
   */
  updateCustomer(
    customerId: number,
    dto: UpdateCustomerReq,
  ): Promise<CustomerResponseDto>;

  /**
   *
   * @param customerId
   * @throws {BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE}
   */
  deleteCustomer(customerId: number): Promise<void>;
}

export class CustomerService implements ICustomerService {
  constructor(private _unitOfWork: IUnitOfWork) {}

  async registCustomer(
    dto: RegistCustomerReq,
    companyId: number,
  ): Promise<CustomerResponseDto> {
    const entity = CustomerMapper.toNewEntity(dto, companyId);
    const newCusotmer = await this._unitOfWork.repos.customer.create(entity);

    return CustomerMapper.toResponseData(newCusotmer);
  }

  async updateCustomer(
    customerId: number,
    dto: UpdateCustomerReq,
  ): Promise<CustomerResponseDto> {
    const customer = await this._unitOfWork.repos.customer.findById(customerId);

    if (!customer) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_NOT_EXIST,
      });
    }

    const entity = CustomerMapper.toUpdateEntity(customer, dto);

    try {
      const updatedCustomer = await this._unitOfWork.repos.customer.update(
        customerId,
        entity,
      );
      return CustomerMapper.toResponseData(updatedCustomer);
    } catch (err) {
      if (err instanceof TechnicalException) {
        if (err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
          throw new BusinessException({
            type: BusinessExceptionType.CUSTOMER_DATA_CHANGED,
          });
        }
      }
      throw err;
    }
  }

  async deleteCustomer(customerId: number): Promise<void> {
    try {
      await this._unitOfWork.repos.customer.delete(customerId);
    } catch (err) {
      if (err instanceof TechnicalException) {
        if (err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED) {
          throw new BusinessException({
            type: BusinessExceptionType.CUSTOMER_DATA_ARLEADY_DELETE,
          });
        }
      }
    }
  }
}
