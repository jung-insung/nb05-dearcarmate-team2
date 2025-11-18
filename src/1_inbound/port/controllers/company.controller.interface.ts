import { Request, Response } from "express";

export interface ICompanyController {
  createCompany(req: Request, res: Response): Promise<void>;
  updateCompany(req: Request, res: Response): Promise<void>;
  deleteCompany(req: Request, res: Response): Promise<void>;
}
