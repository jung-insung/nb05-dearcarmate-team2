import { RegistCustomerReq } from "../../1_inbound/requests/customer-schema.request";
import { CustomerResponseDto } from "../../1_inbound/response/customer.response";
import { CustomerMapper } from "../../3_outbound/mappers/customer.mapper";
import { ICustomerRepo } from "../../3_outbound/repos/customer.repo";

export interface ICustomerService {}

export class CustomerService implements ICustomerService {
  CustomerRepository;
  constructor(CustomerRepository: ICustomerRepo) {
    this.CustomerRepository = CustomerRepository;
  }

  async registCustomer(
    dto: RegistCustomerReq,
    companyId: number,
  ): Promise<CustomerResponseDto> {
    const entity = CustomerMapper.toNewEntity(dto, companyId);
    const newCusotmer = await this.CustomerRepository.create(entity);
    return CustomerMapper.toResponseData(newCusotmer);
  }
}
