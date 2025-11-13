import { CustomerCreateData, CustomerEntity, CustomerUpdatedData, NewCustomerEntity, PersistCustomerEntity } from "../../2_domain/entities/customer/customer.entity";

export class CustomerMapper {
  static toCreateData(entity: NewCustomerEntity) : {customer : CustomerCreateData} {
    return {
      customer: entity.toCreateData()
    }
  }

  static toUpdateData(entity: PersistCustomerEntity) : { customer: CustomerUpdatedData} {
    return {
      customer: entity.toUpdateData()
    }
  }

  static toPersistEntity(record: PersistCustomerEntity): CustomerEntity {
    return CustomerEntity.createPersist(record)
  }
}