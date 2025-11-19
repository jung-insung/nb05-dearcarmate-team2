import { Request, Response } from "express";
import { ICompanyController } from "../port/controllers/company.controller.interface";
import { ICompanyService } from "../port/services/company.service.interface";
import { BaseController } from "./base.controller";
import {
  getCompanyListReqSchema,
  getUserListReqSchema,
  createCompanyReqSchema,
  updateCompanyReqSchema,
  deleteCompanyReqSchema,
} from "../requests/company-schema.request";
import { companyFieldExceptionMap } from "../requests/validater-map";

export class CompanyController
  extends BaseController
  implements ICompanyController
{
  constructor(private _companyService: ICompanyService) {
    super();
  }

  getCompanyList = async (req: Request, res: Response) => {
    const { query } = this.validateOrThrow(
      getCompanyListReqSchema,
      { query: req.query },
      companyFieldExceptionMap,
    );

    const result = await this._companyService.getCompanyList(query);

    return res.status(200).json(result);
  };

  getUserList = async (req: Request, res: Response) => {
    const { query } = this.validateOrThrow(
      getUserListReqSchema,
      { query: req.query },
      companyFieldExceptionMap,
    );

    const result = await this._companyService.getUserList(query);

    return res.status(200).json(result);
  };

  createCompany = async (req: Request, res: Response) => {
    const { body } = this.validateOrThrow(
      createCompanyReqSchema,
      { body: req.body },
      companyFieldExceptionMap,
    );

    const newCompany = await this._companyService.createCompany(body);

    return res.status(201).json(newCompany);
  };

  updateCompany = async (req: Request, res: Response) => {
    const { params, body } = this.validateOrThrow(
      updateCompanyReqSchema,
      { params: req.params, body: req.body },
      companyFieldExceptionMap,
    );

    const updatedCompany = await this._companyService.updateCompany(
      params.companyId,
      body,
    );

    return res.status(200).json(updatedCompany);
  };

  deleteCompany = async (req: Request, res: Response) => {
    const { params } = this.validateOrThrow(
      deleteCompanyReqSchema,
      { params: req.params },
      companyFieldExceptionMap,
    );

    await this._companyService.deleteCompany(params.companyId);

    return res.status(200).json({ message: "회사 삭제 성공" });
  };
}
