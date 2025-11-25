import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { IContractDocService } from "../../2_domain/services/contract-doc.service";
import { contractDocDownLoadReqSchema, contractDocDraftListReqSchema, contractDocListReqSchema, contractDocUploadReqSchema } from "../requests/contract-doc-schema.request";
import { contractDocListResDto } from "../responses/contract-doc/contract-doc-list.res.dto";
import { DraftcontractsResDto } from "../responses/contract-doc/draft-contracts.res.dto";
import { UploadContractDocResDto } from "../responses/contract-doc/upload-contract-doc.res.dto";
import path from "path"

export class ContractDocController extends BaseController {
  constructor(private _ContractDocService: IContractDocService) {
    super();
  }

  getContractDocs = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(contractDocListReqSchema, {
      userId: req.userId,
      query: req.query,
    });

    const contractDocList = await this._ContractDocService.getContractForDocView(reqDto);

    const resDto = new contractDocListResDto(contractDocList);
    return res.json(resDto);
  };

  getContractsForDraft = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(contractDocDraftListReqSchema, {
      userId: req.userId
    })
    const draftContracts = await this._ContractDocService.getDraftContracts(reqDto);

    const resDto = new DraftcontractsResDto(draftContracts);
    return res.json(resDto);
  };

  uploadContractDoc = async (
    req: Request,
    res: Response,
  ): Promise<Response<any>> => {
    const reqDto = this.validateOrThrow(contractDocUploadReqSchema, {
      userId: req.userId,
      body: req.body
    })
    const uploadContractDoc = await this._ContractDocService.uploadContractDoc(reqDto);

    const resDto = new UploadContractDocResDto(uploadContractDoc);
    return res.json(resDto);
  };

  downloadContractDoc = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const reqDto = this.validateOrThrow(contractDocDownLoadReqSchema, {
      userId: req.userId,
      params: req.params
    })

    const downloadcontractDocs = await this._ContractDocService.downloadcontractDocs(reqDto);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${downloadcontractDocs.fileName}"; filename*=UTF-8''${encodeURIComponent(downloadcontractDocs.fileName)}`
    )
    return res.sendFile(path.resolve(downloadcontractDocs.filePath));
  };
}