import { CustomerMapper } from "../../3_outbound/mappers/customer.mapper";
import {
  CustomerRepository,
  ICustomerRepository,
} from "../../3_outbound/repositories/customer.repository";
import { NewCustomerEntity } from "../entities/customer/customer.entity";

export interface ICustomerService {}

export class CustomerService implements ICustomerService {
  CustomerRepository;
  constructor(CustomerRepository: ICustomerRepository) {
    this.CustomerRepository = CustomerRepository;
  }

  async registCustomer(
    companyId: number,
    createDTO: {},
  ): Promise<NewCustomerEntity> {
    const entity = CustomerMapper.toCreateData(createDTO);
    const createdUser = await this.CustomerRepository.create(entity);
  }
}
