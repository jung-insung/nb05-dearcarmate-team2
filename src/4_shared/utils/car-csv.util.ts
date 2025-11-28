import { BusinessException } from "../exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../exceptions/business.exceptions/exception-info";
import {
  RegisterCarReq,
  CAR_NUMBER_REGEX,
} from "../../1_inbound/requests/car-schema.request";
import { MODEL_TYPE_MAP } from "./car-type.util";

function normalizeManufacturer(raw: string): string {
  const v = raw.trim().replace(/\s+/g, "");
  if (["기아", "현대", "쉐보레"].includes(v)) return v;

  throw new BusinessException({
    type: BusinessExceptionType.INVALID_MANUFACTURER,
  });
}

function toNumber(value: string, errorType: BusinessExceptionType): number {
  const n = Number(value);
  if (Number.isNaN(n)) throw new BusinessException({ type: errorType });
  return n;
}

export class CarCsvUtil {
  static parse(content: string): RegisterCarReq[] {
    const lines = content
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_FILE_EMPTY,
      });
    }

    if (lines.length <= 1) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
      });
    }

    const header = lines[0].split(",").map((h) => h.trim());
    const expected = [
      "carNumber",
      "manufacturer",
      "model",
      "manufacturingYear",
      "mileage",
      "price",
      "accidentCount",
      "explanation",
      "accidentDetails",
    ];

    if (header.length < expected.length) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_INVALID_CSV_HEADER,
      });
    }

    const result: RegisterCarReq[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      if (row.length < expected.length) {
        throw new BusinessException({
          type: BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
        });
      }

      let [
        carNumber,
        rawManufacturer,
        model,
        yearStr,
        mileageStr,
        priceStr,
        accidentStr,
        explanation,
        accidentDetails,
      ] = row.map((v) => v.trim());

      // 차량번호 공백 제거 + 형식 검증 추가
      const cleanedCarNumber = carNumber.replace(/\s+/g, "");

      if (!CAR_NUMBER_REGEX.test(cleanedCarNumber)) {
        throw new BusinessException({
          type: BusinessExceptionType.INVALID_CAR_NUMBER,
        });
      }

      const manufacturer = normalizeManufacturer(rawManufacturer);

      const manufacturingYear = toNumber(
        yearStr,
        BusinessExceptionType.INVALID_MANUFACTURINGYEAR,
      );
      const mileage = toNumber(
        mileageStr,
        BusinessExceptionType.INVALID_MILEAGE,
      );
      const price = toNumber(priceStr, BusinessExceptionType.INVALID_PRICE);

      const accidentCount = toNumber(
        accidentStr || "0",
        BusinessExceptionType.INVALID_ACCIDENTCOUNT,
      );

      const type = MODEL_TYPE_MAP[model] ?? "세단";

      result.push({
        carNumber: cleanedCarNumber,
        manufacturer,
        model,
        manufacturingYear,
        mileage,
        price,
        accidentCount,
        explanation: explanation || undefined,
        accidentDetails: accidentDetails || undefined,
        type,
      } as RegisterCarReq);
    }

    if (result.length === 0) {
      throw new BusinessException({
        type: BusinessExceptionType.CAR_UPLOAD_NO_VALID_DATA,
      });
    }

    return result;
  }
}
