import { Request, Response } from "express";
import { BaseController, ControllerHandler } from "./base.controller";
import {
  registCustomerSchema,
  updateCustomerSchema,
} from "../requests/customer-schema.request";
import { customerFieldExceptionMap } from "../requests/validater-map";
import { ICustomerService } from "../port/services/customer.service.interface";

export interface ICustomerConteroller {
  registCustomer: ControllerHandler;
  updateCustomer: ControllerHandler;
  deleteCusomer: ControllerHandler;
}

export class CustomerController extends BaseController {
  constructor(private _customerService: ICustomerService) {
    super();
  }

  async registCustomer(req: Request, res: Response) {
    const userId = req.userId!;
    const dto = this.validateOrThrow(
      registCustomerSchema,
      { body: req.body },
      customerFieldExceptionMap,
    );

    const newCusotmer = await this._customerService.registCustomer({
      dto,
      userId,
    });

    res.status(201).json(newCusotmer);
  }

  async getCustomers(req: Request, res: Response) {
    const userId = req.userId!;
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 8);

    const customers = await this._customerService.getCustoemrs({
      userId,
      page,
      pageSize,
      searchBy: req.query.searchBy,
      keyword: req.query.keyword,
    });

    return res.status(200).json(customers);
  }

  async getCustomer(req: Request, res: Response) {
    const { customerId } = req.params;
    const customer = await this._customerService.getCustomer(customerId);

    return res.status(200).json(customer);
  }

  async updateCustomer(req: Request, res: Response) {
    const { customerId } = req.params;
    const dto = this.validateOrThrow(
      updateCustomerSchema,
      { body: req.body },
      customerFieldExceptionMap,
    );

    const updatedCustomer = await this._customerService.updateCustomer({
      customerId,
      dto,
    });

    res.status(200).json(updatedCustomer);
  }

  async deleteCusomer(req: Request, res: Response) {
    const { customerId } = req.params;
    await this._customerService.deleteCustomer(customerId);

    res.status(200).json({ message: "고객 삭제 성공" });
  }

  async uploadCustomers(req: Request, res: Response) {
    const userId = req.userId!;
    await this._customerService.uploadCustomers({ userId, req });

    res.status(200).json({ message: "고객 정보가 등록되었습니다" });
  }
}
