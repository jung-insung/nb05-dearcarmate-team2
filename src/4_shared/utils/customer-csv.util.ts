import { RegistCustomerReq } from "../../1_inbound/requests/customer-schema.request";
import { BusinessException } from "../exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../exceptions/business.exceptions/exception-info";
import {
  normalizeAgeGroup,
  normalizeGender,
  normalizeRegion,
} from "./customer-normalizer.util";

export class CustomerCSVUtil {
  static parse(content: string): RegistCustomerReq[] {
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
        type: BusinessExceptionType.CUSTOMER_FILE_DATAFORM_INCOREECT,
      });
    }
    const header = lines[0].split(",").map((h) => h.trim());
    const expected = [
      "name",
      "email",
      "gender",
      "phoneNumber",
      "region",
      "ageGroup",
      "memo",
    ];

    if (header.length < expected.length) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER,
      });
    }

    const result: RegistCustomerReq[] = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      if (row.length < expected.length) {
        throw new BusinessException({
          type: BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER,
        });
      }
      const [
        name,
        email,
        rawGender,
        phoneNumber,
        rawRegion,
        rawAgeGroup,
        memo,
      ] = row;

      if (!name)
        throw new BusinessException({
          type: BusinessExceptionType.CUSTOMER_CSV_INVALID_NAME,
        });

      if (!email)
        throw new BusinessException({
          type: BusinessExceptionType.CUSTOMER_CSV_INVALID_EMAIL,
        });

      if (!phoneNumber)
        throw new BusinessException({
          type: BusinessExceptionType.CUSTOMER_CSV_INVALID_PHONENUMBER,
        });

      const gender = normalizeGender(rawGender);
      const ageGroup = normalizeAgeGroup(rawAgeGroup);
      const region = normalizeRegion(rawRegion);

      result.push({
        body: {
          name,
          email,
          gender,
          phoneNumber,
          region,
          ageGroup,
          memo,
        },
      });
    }

    return result;
  }
}
