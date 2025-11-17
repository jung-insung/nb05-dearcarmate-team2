import {
  CarEntity,
  PersistCarRecord,
} from "../../2_domain/entities/car/car.entity";

export class CarMapper {
  static toPersistEntity(record: PersistCarRecord): CarEntity {
    return CarEntity.fromPersistence(record);
  }

  static toCreateData(entity: CarEntity) {
    return entity.toCreateData();
  }

  static toUpdateData(entity: CarEntity) {
    return entity.toUpdateData();
  }
}
