import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

export const authFieldExceptionMap: Record<string, BusinessExceptionType> = {
  email: BusinessExceptionType.EMAIL_FORM,
  password: BusinessExceptionType.PASSWORD_FORM,
  refreshToken: BusinessExceptionType.REFRESH_FORM,
};

export const userFieldExceptionMap: Record<string, BusinessExceptionType> = {
  userId: BusinessExceptionType.USERID_FORM,
  userName: BusinessExceptionType.USERNAME_FORM,
  email: BusinessExceptionType.EMAIL_FORM,
  employeeNumber: BusinessExceptionType.EMPLOYEENUMBER_FORM,
  phoneNumber: BusinessExceptionType.PHONENUMBER_FORM,
  password: BusinessExceptionType.PASSWORD_FORM,
  passwordConfirmation: BusinessExceptionType.PASSWORD_FORM,
  companyName: BusinessExceptionType.COMPANYNAME_FORM,
  companyCode: BusinessExceptionType.COMPANYCODE_FORM,
};

export const companyFieldExceptionMap: Record<string, BusinessExceptionType> = {
  userId: BusinessExceptionType.USERID_FORM,
  companyId: BusinessExceptionType.COMPANYID_FORM,
  companyName: BusinessExceptionType.COMPANYNAME_FORM,
  companyCode: BusinessExceptionType.COMPANYCODE_FORM,
  page: BusinessExceptionType.BAD_REQUEST,
  pageSize: BusinessExceptionType.BAD_REQUEST,
  searchBy: BusinessExceptionType.BAD_REQUEST,
  keyword: BusinessExceptionType.BAD_REQUEST,
};

export const customerFieldExceptionMap: Record<string, BusinessExceptionType> =
{
  name: BusinessExceptionType.CUSTOMER_NAME_FORM, 
  gender: BusinessExceptionType.BAD_REQUEST,
  phoneNumber: BusinessExceptionType.CUSTOMER_PHONENUMBER_FORM,
  ageGroup: BusinessExceptionType.BAD_REQUEST,
  region : BusinessExceptionType.BAD_REQUEST,
  email: BusinessExceptionType.CUSTOMER_EMAIL_FORM,
  memo: BusinessExceptionType.BAD_REQUEST,
  page: BusinessExceptionType.BAD_REQUEST,
  pageSize: BusinessExceptionType.BAD_REQUEST,
  searchBy: BusinessExceptionType.BAD_REQUEST,
  keyword: BusinessExceptionType.CUSTOMER_KEYWORD_ERR,

}
  ;

export const carFieldExceptionMap: Record<string, BusinessExceptionType> = {
  carNumber: BusinessExceptionType.INVALID_CAR_NUMBER,
  manufacturer: BusinessExceptionType.INVALID_MANUFACTURER,
  model: BusinessExceptionType.INVALID_MODEL,
  manufacturingYear: BusinessExceptionType.INVALID_MANUFACTURINGYEAR,
  mileage: BusinessExceptionType.INVALID_MILEAGE,
  price: BusinessExceptionType.INVALID_PRICE,
  accidentCount: BusinessExceptionType.INVALID_ACCIDENTCOUNT,
  explanation: BusinessExceptionType.INVALID_EXPLANATION,
  accidentDetails: BusinessExceptionType.INVALID_ACCIDENTDETAILS,
};
