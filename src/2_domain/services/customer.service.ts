import { ICustomerService } from "../../1_inbound/port/services/customer.service.interface";
import {
  RegistCustomerReq,
  UpdateCustomerReq,
} from "../../1_inbound/requests/customer-schema.request";
import {
  CustomerListResponseDto,
  CustomerResponseDto,
} from "../../1_inbound/responses/customer/customer.response";
import { CustomerMapper } from "../../3_outbound/mappers/customer.mapper";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { TechnicalExceptionType } from "../../4_shared/exceptions/technical.exceptions/exception-info";
import { TechnicalException } from "../../4_shared/exceptions/technical.exceptions/technical.exception";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export class CustomerService extends BaseService implements ICustomerService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork)
  }


  async registCustomer(params: {
    dto: RegistCustomerReq;
    userId: number;
  }): Promise<CustomerResponseDto> {
    const { dto, userId } = params;
    const companyId = await this._unitOfWork.repos.user.findUserById(userId)

    const entity = CustomerMapper.toNewEntity(dto, companyId);
    const newCusotmer = await this._unitOfWork.repos.customer.create(entity);

    return CustomerMapper.toResponseData(newCusotmer);
  }

  async getCustomers(params: {
    companyId: number;
    page: number;
    pageSize: number;
    searchBy?: "name" | "email";
    keyword?: string;
  }): Promise<CustomerListResponseDto> {
    const { page, pageSize } = params;

    const { data, totalItemCount } =
      await this._unitOfWork.repos.customer.findAll(params);

    return {
      currentPage: page,
      totalPages: Math.ceil(totalItemCount / pageSize),
      totalItemCount,
      data,
    };
  }

  async getCustomer(customerId: number): Promise<CustomerResponseDto> {
    const customer = await this._unitOfWork.repos.customer.findById(customerId);

    if (!customer) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_NOT_EXIST,
      });
    }

    return CustomerMapper.toResponseData(customer);
  }

  async updateCustomer(params: {
    customerId: number;
    dto: UpdateCustomerReq;
  }): Promise<CustomerResponseDto> {
    const { customerId, dto } = params;
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

  async uploadCustomers(params: {
    companyId: number;
    req: any;
  }): Promise<void> {
    const { companyId, req } = params;
    await this._unitOfWork.repos.customer.upload({
      companyId,
      req,
    });
  }
}
