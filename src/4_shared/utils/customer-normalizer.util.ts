import {
  CustomerAgeGroup,
  CustomerGender,
  CustomerRegion,
} from "../../2_domain/entities/customer/customer.enum";
import { BusinessException } from "../exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../exceptions/business.exceptions/exception-info";

export function normalizeGender(raw: string): CustomerGender {
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

export function normalizeRegion(raw: string): CustomerRegion | undefined {
  if (!raw || raw.trim() === "") return undefined;

  const v = raw.trim().toUpperCase();

  if (Object.values(CustomerRegion).includes(v as CustomerRegion)) {
    return v as CustomerRegion;
  }

  const map: Record<string, CustomerRegion> = {
    서울: CustomerRegion.SEOUL,
    경기: CustomerRegion.GYEONGGI,
    인천: CustomerRegion.INCHEON,
    강원: CustomerRegion.GANGWON,
    충북: CustomerRegion.CHUNGBUK,
    충남: CustomerRegion.CHUNGNAM,
    세종: CustomerRegion.SEJONG,
    대전: CustomerRegion.DAEJEON,
    전북: CustomerRegion.JEONBUK,
    전남: CustomerRegion.JEONNAM,
    광주: CustomerRegion.GWANGJU,
    경북: CustomerRegion.GYEONGBUK,
    경남: CustomerRegion.GYEONGNAM,
    대구: CustomerRegion.DAEGU,
    울산: CustomerRegion.ULSAN,
    부산: CustomerRegion.BUSAN,
    제주: CustomerRegion.JEJU,
  };

  const ko = raw.trim();
  if (map[ko]) return map[ko];

  throw new BusinessException({
    type: BusinessExceptionType.CUSTOMER_CSV_INVALID_REGION,
  });
}

export function normalizeAgeGroup(raw: string): CustomerAgeGroup | undefined {
  if (!raw || raw.trim() === "") return undefined;

  const cleaned = raw.replace(/^\uFEFF/, "").trim();

  const upper = cleaned.toUpperCase();
  if (Object.values(CustomerAgeGroup).includes(upper as CustomerAgeGroup)) {
    return upper as CustomerAgeGroup;
  }

  const rangeMatch = cleaned.match(/^(\d{2})-(\d{2})$/);
  if (rangeMatch) {
    const start = rangeMatch[1];

    const mapRange: Record<string, CustomerAgeGroup> = {
      "10": CustomerAgeGroup.TEN,
      "20": CustomerAgeGroup.TWENTY,
      "30": CustomerAgeGroup.THIRTY,
      "40": CustomerAgeGroup.FOURTY,
      "50": CustomerAgeGroup.FIFTY,
      "60": CustomerAgeGroup.SIXTY,
      "70": CustomerAgeGroup.SEVENTY,
      "80": CustomerAgeGroup.EIGHTY,
    };

    if (mapRange[start]) return mapRange[start];
  }

  const mapSimple: Record<string, CustomerAgeGroup> = {
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

  if (mapSimple[cleaned]) return mapSimple[cleaned];

  throw new BusinessException({
    type: BusinessExceptionType.CUSTOMER_CSV_INVALID_AGEGROUP,
  });
}
