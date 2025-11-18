import { Request, Response } from "express";
import { ICustomerService } from "../../2_domain/services/customer.service";
import { BaseController } from "./base.controller";
import { registCustomerSchema } from "../requests/customer-schema.request";
import { customerFieldExceptionMap } from "../requests/validater-map";

export class CustomerController extends BaseController {
  constructor(private _customerService: ICustomerService) {
    super();
  }

  registCustomer(req: Request, res: Response) {
    const { companyId } = req.companyId; // 토큰 추출. 인증 미들웨어에서..
    const reqDto = this.validateOrThrow(
      registCustomerSchema,
      { body: req.body },
      customerFieldExceptionMap,
    );

    const newCusotmer = this._customerService.registCustomer(companyId, reqDto);

    res.status(201).json(newCusotmer);
  }
}
