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
import { CustomerCSVUtil } from "../../4_shared/utils/customer-csv.util";
import { IUnitOfWork } from "../port/unit-of-work.interface";
import { BaseService } from "./base.service";

export class CustomerService extends BaseService implements ICustomerService {
  constructor(unitOfWork: IUnitOfWork) {
    super(unitOfWork);
  }

  async registCustomer(params: {
    dto: RegistCustomerReq;
    userId: number;
  }): Promise<CustomerResponseDto> {
    try {
      const { dto, userId } = params;

      const companyId = await this._getCompanyId(userId);

      const entity = CustomerMapper.toNewEntity({ dto, companyId });
      const newCusotmer = await this._unitOfWork.repos.customer.create(entity);
      return CustomerMapper.toResponseData(newCusotmer);
    } catch (err) {
      if (err instanceof TechnicalException) {
        if (err.type === TechnicalExceptionType.UNIQUE_VIOLATION_EMAIL) {
          throw new BusinessException({
            type: BusinessExceptionType.ALREADY_EXIST_EAMIL,
          });
        }
      }
      throw err;
    }
  }

  async getCustomers(params: {
    userId: number;
    page: number;
    pageSize: number;
    searchBy?: "name" | "email";
    keyword?: string;
  }): Promise<CustomerListResponseDto> {
    const { userId, page, pageSize, searchBy, keyword } = params;

    const companyId = await this._getCompanyId(userId);

    const { data, totalItemCount } =
      await this._unitOfWork.repos.customer.findAll({
        companyId,
        page,
        pageSize,
        searchBy,
        keyword,
      });

    const resData = data.map(CustomerMapper.toResponseData);

    return {
      currentPage: page,
      totalPages: Math.ceil(totalItemCount / pageSize),
      totalItemCount,
      data: resData,
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

    return await this._unitOfWork.do(
      async (txRepos) => {
        const customer = await txRepos.customer.findById(customerId);

        if (!customer) {
          throw new BusinessException({
            type: BusinessExceptionType.CUSTOMER_NOT_EXIST,
          });
        }
        const entity = CustomerMapper.toUpdateEntity(customer, dto);

        try {
          const updatedCustomer = await txRepos.customer.update(
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
      },
    );
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

  async uploadCustomers(params: { userId: number; req: any }): Promise<void> {
    const { userId, req } = params;
    const companyId = await this._getCompanyId(userId);
    const file = req.file;

    if (!file) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_FILE_NOT_UPLOAD,
      });
    }
    const content = file.buffer?.toString("utf-8");

    if (!content) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_UPLOAD_FILE_EMPTY,
      });
    }

    const rows = CustomerCSVUtil.parse(content);

    if (rows.length === 0) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_FILE_DATAFORM_INCOREECT,
      });
    }
    await this._unitOfWork.do(async (txRepos) => {
      for (const row of rows) {
        const entity = CustomerMapper.toNewEntities({
          row: row.body,
          companyId,
        });
        await txRepos.customer.create(entity);
      }
    }, false);
  }
}
