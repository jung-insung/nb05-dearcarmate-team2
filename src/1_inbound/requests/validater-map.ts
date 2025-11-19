import { email } from "zod";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

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
  page: BusinessExceptionType.BAD_REQUEST,
  pageSize: BusinessExceptionType.BAD_REQUEST,
  searchBy: BusinessExceptionType.BAD_REQUEST,
  keyword: BusinessExceptionType.BAD_REQUEST,
};

export const customerFieldExceptionMap: Record<string, BusinessExceptionType> =
  {};

export const carFieldExceptionMap: Record<string, BusinessExceptionType> = {};
