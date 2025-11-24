import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { IContractService } from "../port/services/contract.service.interface";
import { IContractController } from "../port/controllers/contract.controller.interface";
import { getContractListReqSchema } from "../requests/contract-schema.request";

export class ContractController
  extends BaseController
  implements IContractController
{
  constructor(private readonly _contractService: IContractService) {
    super();
  }

  getContracts = async (req: Request, res: Response) => {
    const { query, userId } = this.validateOrThrow(getContractListReqSchema, {
      query: req.query,
      userId: req.userId,
    });

    const result = await this._contractService.getContracts(userId, query);

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
}
