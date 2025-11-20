export interface CustomerResponseDto {
  id: number;
  name: string;
  gender: string;
  phoneNumber: string;
  ageGroup?: string;
  region?: string;
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
