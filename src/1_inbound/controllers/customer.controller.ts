import { Request, Response } from "express";
import { ICustomerService } from "../../2_domain/services/customer.service";
import { BaseController } from "./base.controller";
import {
  registCustomerSchema,
  updateCustomerSchema,
} from "../requests/customer-schema.request";
import { customerFieldExceptionMap } from "../requests/validater-map";

export class CustomerController extends BaseController {
  constructor(private _customerService: ICustomerService) {
    super();
  }

  async registCustomer(req: Request, res: Response) {
    const { companyId } = req.companyId; // 토큰 추출. 인증 미들웨어에서..
    const reqDto = this.validateOrThrow(
      registCustomerSchema,
      { body: req.body },
      customerFieldExceptionMap,
    );

    const newCusotmer = await this._customerService.registCustomer(
      companyId,
      reqDto,
    );

    res.status(201).json(newCusotmer);
  }

  async updateCustomer(req: Request, res: Response) {
    const { id } = req.userId;
    const reqDto = this.validateOrThrow(
      updateCustomerSchema,
      { body: req.body },
      customerFieldExceptionMap,
    );

    const updatedCustomer = await this._customerService.updateCustomer(
      id,
      reqDto,
    );

    res.status(201).json(updatedCustomer);
  }

  async deleteCusomer(req: Request, res: Response): Promise<void> {
    const { id } = req.userId;
    await this._customerService.deleteCusomer(id);

    res.status(200).json();
  }
}
