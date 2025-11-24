import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { IContractDocService } from "../../2_domain/services/contractDoc.service";
import { contractDocListReqSchema } from "../requests/contract-doc-schema.request";
import { contractDocListResDto } from "../responses/contract-doc/contract-doc-list.res.dto";

export class ContractDocController extends BaseController {
  constructor(
    private _ContractDocService: IContractDocService,
  ) {
    super();
  }

  getContractDocAfterUpload = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(contractDocListReqSchema, {
      userId: req.userId,
      query: req.query
    })

    const contractDocList = await this._ContractDocService.getContractForDocView(reqDto);
    
    const resDto = new contractDocListResDto(contractDocList);
    return res.json(resDto);

  };

  // getContractDocAfterAdd = async (
  //   req: Request,
  //   res: Response,
  // ): Promise<Response<any>> => {
  //   const contractDocList = this._ContractDocService.contractDocList(reqDto);
    
  //   const resDto = new contractDocListResDto(contractDocList);
  //   return res.json(resDto);
  // };

  // uploadContractDoc = async (
  //   req: Request,
  //   res: Response,
  // ): Promise<Response<any>> => {
  //   const reqDto = this.validateOrThrow(contractDocUploadListReqSchema, {
  //     userId: req.userId,
  //     body: req.body
  //   })
  //   const contractDocList = this._ContractDocService.contractDocList(reqDto);
    
  //   const resDto = new contractDocListResDto(contractDocList);
  //   return res.json(resDto);
  // };

  // downloadContractDoc = async (
  //   req: Request,
  //   res: Response,
  // ): Promise<Response<any>> => {
  //   const contractDocList = this._ContractDocService.contractDocList(reqDto);
    
  //   const resDto = new contractDocListResDto(contractDocList);
  //   return res.json(resDto);
  // };
}