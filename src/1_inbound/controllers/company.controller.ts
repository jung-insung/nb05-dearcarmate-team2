import { Request, Response } from "express";
import { ICompanyService } from "../port/services/company.service.interface";
import { BaseController } from "./base.controller";
import {
  getCompanyListReqSchema,
  getUserListReqSchema,
  createCompanyReqSchema,
  updateCompanyReqSchema,
  deleteCompanyReqSchema,
} from "../requests/company-schema.request";

export class CompanyController
  extends BaseController
{
  constructor(private _companyService: ICompanyService) {
    super();
  }

  getCompanyList = async (req: Request, res: Response) => {
    const { query, userId } = this.validateOrThrow(getCompanyListReqSchema, {
      query: req.query,
      userId: req.userId,
    });

    const result = await this._companyService.getCompanyList(query, userId);

    return res.status(200).json(result);
  };

  getUserList = async (req: Request, res: Response) => {
    const { query, userId } = this.validateOrThrow(getUserListReqSchema, {
      query: req.query,
      userId: req.userId,
    });

    const result = await this._companyService.getUserList(query, userId);

    return res.status(200).json(result);
  };

  createCompany = async (req: Request, res: Response) => {
    const { body, userId } = this.validateOrThrow(createCompanyReqSchema, {
      body: req.body,
      userId: req.userId,
    });

    const newCompany = await this._companyService.createCompany(body, userId);

    return res.status(201).json(newCompany);
  };

  updateCompany = async (req: Request, res: Response) => {
    const { params, body, userId } = this.validateOrThrow(
      updateCompanyReqSchema,
      { params: req.params, body: req.body, userId: req.userId },
    );

    const updatedCompany = await this._companyService.updateCompany(
      params.companyId,
      body,
      userId,
    );

    return res.status(200).json(updatedCompany);
  };

  deleteCompany = async (req: Request, res: Response) => {
    const { params, userId } = this.validateOrThrow(deleteCompanyReqSchema, {
      params: req.params,
      userId: req.userId,
    });

    await this._companyService.deleteCompany(params.companyId, userId);

    return res.status(200).json({ message: "회사 삭제 성공" });
  };
}
