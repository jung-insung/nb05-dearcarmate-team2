import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { IContractService } from "../port/services/contract.service.interface";
import { IContractController } from "../port/controllers/contract.controller.interface";
import {
  createContractReqSchema,
  getContractListReqSchema,
  updateContractReqSchema,
  deleteContractReqSchema,
} from "../requests/contract-schema.request";

export class ContractController
  extends BaseController
  implements IContractController
{
  constructor(private _contractService: IContractService) {
    super();
  }

  createContract = async (req: Request, res: Response) => {
    const { body } = this.validateOrThrow(createContractReqSchema, req);

    const result = await this._contractService.createContract({
      userId: req.userId!,
      dto: body,
    });

    return res.status(201).json(result);
  };

  updateContract = async (req: Request, res: Response) => {
    const contractId = Number(req.params.id);
    const userId = Number(req.userId);
    const body = req.body;

    const dto = this.validateOrThrow(updateContractReqSchema, { body });
    const result = await this._contractService.updateContract({
      userId,
      contractId,
      dto,
    });
    return res.status(200).json(result);
  };

  getContractLists = async (req: Request, res: Response) => {
    const { query, userId } = this.validateOrThrow(getContractListReqSchema, {
      query: req.query,
      userId: req.userId,
    });

    const result = await this._contractService.getContractLists(userId, query);

    return res.json(result);
  };

  getContractCars = async (req: Request, res: Response) => {
    const result = await this._contractService.getContractCars(req.userId!);

    return res.json(result);
  };

  getContractCustomers = async (req: Request, res: Response) => {
    const result = await this._contractService.getContractCustomers(
      req.userId!,
    );

    return res.json(result);
  };

  getContractUsers = async (req: Request, res: Response) => {
    const result = await this._contractService.getContractUsers(req.userId!);

    return res.json(result);
  };

  deleteContract = async (req: Request, res: Response) => {
    const { params, userId } = this.validateOrThrow(deleteContractReqSchema, {
      params: req.params,
      userId: req.userId,
    });

    await this._contractService.deleteContract({
      userId: userId!,
      contractId: params.contractId,
    });

    return res.status(200).json({ message: "계약 삭제 성공" });
  };
}
