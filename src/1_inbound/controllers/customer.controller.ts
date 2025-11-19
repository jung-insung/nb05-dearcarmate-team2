import { Request, Response } from "express";
import { ICustomerService } from "../../2_domain/services/customer.service";
import { BaseController, ControllerHandler } from "./base.controller";
import {
  registCustomerSchema,
  updateCustomerSchema,
} from "../requests/customer-schema.request";
import { customerFieldExceptionMap } from "../requests/validater-map";

export interface ICustomerConteroller {
  registCustomer: ControllerHandler;
  updateCustomer: ControllerHandler;
  deleteCusomer: ControllerHandler;
}

export class CustomerController extends BaseController {
  constructo r(private _customerService: ICustomerService) {
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
    const { customerId } = req.params;
    const reqDto = this.validateOrThrow(
      updateCustomerSchema,
      { body: req.body },
      customerFieldExceptionMap,
    );

    const updatedCustomer = await this._customerService.updateCustomer(
      customerId,
      reqDto,
    );

    res.status(200).json(updatedCustomer);
  }

  async deleteCusomer(req: Request, res: Response): Promise<void> {
    const { customerId } = req.params;
    await this._customerService.deleteCusomer(customerId);

    res.status(200).json({ message: "고객 삭제 성공" });
  }
}
