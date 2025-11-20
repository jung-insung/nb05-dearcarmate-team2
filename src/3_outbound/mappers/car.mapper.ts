import { CarManufacturer } from "@prisma/client";
import {
  RegisterCarReq,
  UpdateCarReq,
} from "../../1_inbound/requests/car-schema.request";
import {
  CarEntity,
  PersistCarRecord,
} from "../../2_domain/entities/car/car.entity";

export class CarMapper {
  private static mapManufacturer(input: string): CarManufacturer {
    switch (input) {
      case "기아":
        return CarManufacturer.KIA;
      case "현대":
        return CarManufacturer.HYUNDAI;
      case "쉐보레":
        return CarManufacturer.CHEVROLET;
      default:
        throw new Error("Invalid manufacturer");
    }
  }

  static toCreateEntity(
    req: RegisterCarReq & { companyId: number },
  ): CarEntity {
    return CarEntity.create({
      carNumber: req.carNumber,
      manufacturer: this.mapManufacturer(req.manufacturer),
      model: req.model,
      manufacturingYear: req.manufacturingYear,
      mileage: req.mileage,
      price: req.price,
      accidentCount: req.accidentCount ?? 0,
      explanation: req.explanation ?? null,
      accidentDetails: req.accidentDetails ?? null,
      companyId: req.companyId,
    });
  }

  static toUpdateEntity(existing: CarEntity, req: UpdateCarReq): CarEntity {
    return CarEntity.update(existing, {
      ...(req.carNumber !== undefined && { carNumber: req.carNumber }),

      ...(req.manufacturer !== undefined && {
        manufacturer: this.mapManufacturer(req.manufacturer),
      }),

      ...(req.model !== undefined && { model: req.model }),
      ...(req.manufacturingYear !== undefined && {
        manufacturingYear: req.manufacturingYear,
      }),
      ...(req.mileage !== undefined && { mileage: req.mileage }),
      ...(req.price !== undefined && { price: req.price }),
      ...(req.accidentCount !== undefined && {
        accidentCount: req.accidentCount,
      }),
      ...(req.explanation !== undefined && {
        explanation: req.explanation ?? null,
      }),
      ...(req.accidentDetails !== undefined && {
        accidentDetails: req.accidentDetails ?? null,
      }),
    });
  }

  static fromPersistence(record: PersistCarRecord): CarEntity {
    return CarEntity.fromPersistence(record);
  }

  static toResponse(entity: CarEntity) {
    const p = entity.toPersistence();

    return {
      id: p.id,
      carNumber: p.carNumber,
      manufacturer: p.manufacturer,
      model: p.model,
      type: p.type,
      manufacturingYear: p.manufacturingYear,
      mileage: p.mileage,
      price: p.price,
      accidentCount: p.accidentCount,
      explanation: p.explanation,
      accidentDetails: p.accidentDetails,
      status: p.status,
    };
  }
}
