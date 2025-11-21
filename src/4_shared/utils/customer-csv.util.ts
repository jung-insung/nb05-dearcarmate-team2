import { RegistCustomerReq } from "../../1_inbound/requests/customer-schema.request";
import { CustomerAgeGroup, CustomerGender, CustomerRegion } from "../../2_domain/entities/customer/customer.enum";
import { BusinessException } from "../exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../exceptions/business.exceptions/exception-info";

function normalizeGender(raw: string): CustomerGender {
  const v = raw.trim().toUpperCase();

  if (Object.values(CustomerGender).includes(v as CustomerGender)) {
    return v as CustomerGender;
  }

  const ko = raw.trim();
  if (["남", "남자"].includes(ko)) return CustomerGender.MALE;
  if (["여", "여자"].includes(ko)) return CustomerGender.FEMALE;

  throw new BusinessException({
    type: BusinessExceptionType.CUSTOMER_CSV_INVALID_GENDER,
  });
}

function normalizeAgeGroup(raw: string): CustomerAgeGroup | undefined {
  if (!raw || raw.trim() === "") return undefined;

  const v = raw.trim().toUpperCase();

  if (Object.values(CustomerAgeGroup).includes(v as CustomerAgeGroup)) {
    return v as CustomerAgeGroup;
  }

  const map: Record<string, CustomerAgeGroup> = {
    "10대": CustomerAgeGroup.TEN,
    "10": CustomerAgeGroup.TEN,
    "20대": CustomerAgeGroup.TWENTY,
    "20": CustomerAgeGroup.TWENTY,
    "30대": CustomerAgeGroup.THIRTY,
    "30": CustomerAgeGroup.THIRTY,
    "40대": CustomerAgeGroup.FOURTY,
    "40": CustomerAgeGroup.FOURTY,
    "50대": CustomerAgeGroup.FIFTY,
    "50": CustomerAgeGroup.FIFTY,
    "60대": CustomerAgeGroup.SIXTY,
    "60": CustomerAgeGroup.SIXTY,
    "70대": CustomerAgeGroup.SEVENTY,
    "70": CustomerAgeGroup.SEVENTY,
    "80대": CustomerAgeGroup.EIGHTY,
    "80": CustomerAgeGroup.EIGHTY,
  };

  const ko = raw.trim();
  if (map[ko]) return map[ko];

  throw new BusinessException({
    type: BusinessExceptionType.CUSTOMER_CSV_INVALID_AGEGROUP,
  });
}

function normalizeRegion(raw: string): CustomerRegion | undefined {
  if (!raw || raw.trim() === "") return undefined;

  const v = raw.trim().toUpperCase();

  if (Object.values(CustomerRegion).includes(v as CustomerRegion)) {
    return v as CustomerRegion;
  }

  const map: Record<string, CustomerRegion> = {
    "서울": CustomerRegion.SEOUL,
    "경기": CustomerRegion.GYEONGGI,
    "인천": CustomerRegion.INCHEON,
    "강원": CustomerRegion.GANGWON,
    "충북": CustomerRegion.CHUNGBUK,
    "충남": CustomerRegion.CHUNGNAM,
    "세종": CustomerRegion.SEJONG,
    "대전": CustomerRegion.DAEJEON,
    "전북": CustomerRegion.JEONBUK,
    "전남": CustomerRegion.JEONNAM,
    "광주": CustomerRegion.GWANGJU,
    "경북": CustomerRegion.GYEONGBUK,
    "경남": CustomerRegion.GYEONGNAM,
    "대구": CustomerRegion.DAEGU,
    "울산": CustomerRegion.ULSAN,
    "부산": CustomerRegion.BUSAN,
    "제주": CustomerRegion.JEJU,
  };

  const ko = raw.trim();
  if (map[ko]) return map[ko];

  throw new BusinessException({
    type: BusinessExceptionType.CUSTOMER_CSV_INVALID_REGION,
  });
}

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
    const expected = ["name", "gender", "phoneNumber", "email", "ageGroup", "region", "memo"]

    if (header.length < expected.length) {
      throw new BusinessException({
        type: BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER,
      });
    }

    const result: RegistCustomerReq[] = []
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",");

      if (row.length < expected.length) {
        throw new BusinessException({
          type: BusinessExceptionType.CUSTOMER_UPLOAD_INVALID_CSV_HEADER,
        });
      }
      const [name, rawGender, phoneNumber, email, rawAgeGroup, rawRegion, memo] = row

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
          gender,
          phoneNumber,
          email,
          ageGroup,
          region,
          memo,
        }
      });
    }

    return result;
  }
}