import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../4_shared/exceptions/business.exceptions/exception-info";
import { IUnitOfWork } from "../port/unit-of-work.interface";

export class BaseService {
  constructor(protected _unitOfWork: IUnitOfWork) {}

  protected async _getCompanyId(userId: number) {
    const user = await this._unitOfWork.repos.user.findUserById(userId);

    if (!user) {
      throw new BusinessException({
        type: BusinessExceptionType.NOT_FOUND,
        message: "존재하지 않는 사용자입니다.",
      });
    }

    if (!user.companyId) {
      throw new BusinessException({
        type: BusinessExceptionType.COMPANY_NOT_EXIST,
        message: "사용자에 소속된 회사 정보를 찾을 수 없습니다.",
      });
    }

    return user.companyId;
  }
}
