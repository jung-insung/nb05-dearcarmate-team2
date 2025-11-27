export type GenderLabel = "남" | "여";

export type AgeGroupLabel =
  | "10대"
  | "20대"
  | "30대"
  | "40대"
  | "50대"
  | "60대"
  | "70대"
  | "80대";

export type RegionLabel =
  | "서울"
  | "경기"
  | "인천"
  | "강원"
  | "충북"
  | "충남"
  | "세종"
  | "대전"
  | "전북"
  | "전남"
  | "광주"
  | "경북"
  | "경남"
  | "대구"
  | "울산"
  | "부산"
  | "제주";

export interface CustomerResponseDto {
  id: number;
  name: string;
  gender: GenderLabel;
  phoneNumber: string;
  ageGroup?: AgeGroupLabel;
  region?: RegionLabel;
  email: string;
  memo?: string;
  contractCount: number;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerListResponseDto {
  currentPage: number;
  totalPages: number;
  totalItemCount: number;
  data: CustomerResponseDto[];
}
