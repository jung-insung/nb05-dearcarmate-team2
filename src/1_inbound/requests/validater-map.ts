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
  companyId: BusinessExceptionType.COMPANYID_FORM,
  companyName: BusinessExceptionType.COMPANYNAME_FORM,
  companyCode: BusinessExceptionType.COMPANYCODE_FORM,
};

export const customerFieldExceptionMap: Record<string, BusinessExceptionType> =
  {};

export const carFieldExceptionMap: Record<string, BusinessExceptionType> = {};
