import { email } from "zod";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";

export const userFieldExceptionMap: Record<string, any> = {
  userId: BusinessExceptionType.USERID_FORM,
  userName: BusinessExceptionType.USERNAME_FORM,
  email: BusinessExceptionType.EMAIL_FORM,
  employeeNumber: BusinessExceptionType.EMPLOYEENUMBER_FORM,
  phoneNumber: BusinessExceptionType.PHONENUMBER_FORM,
  password: BusinessExceptionType.PASSWORD_FORM,
  passwordConfirmation: BusinessExceptionType.PASSWORD_FORM,
  companyName: BusinessExceptionType.COMPANYNAME_FORM,
  companyCode: BusinessExceptionType.COMPANYCODE_FORM,
}

export const companyFieldExceptionMap: Record<string, any> = {

}

export const customerFieldExceptionMap: Record<string, any> = {

}

export const carFieldExceptionMap: Record<string, any> = {

}
