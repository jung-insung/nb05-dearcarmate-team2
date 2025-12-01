"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const base_controller_1 = require("./base.controller");
const contract_schema_request_1 = require("../requests/contract-schema.request");
class ContractController extends base_controller_1.BaseController {
    constructor(_contractService) {
        super();
        this._contractService = _contractService;
        this.createContract = async (req, res) => {
            const { body } = this.validateOrThrow(contract_schema_request_1.createContractReqSchema, req);
            const result = await this._contractService.createContract({
                userId: req.userId,
                dto: body,
            });
            return res.status(201).json(result);
        };
        this.updateContract = async (req, res) => {
            const contractId = Number(req.params.id);
            const userId = Number(req.userId);
            const body = req.body;
            const dto = this.validateOrThrow(contract_schema_request_1.updateContractReqSchema, { body });
            const result = await this._contractService.updateContract({
                userId,
                contractId,
                dto,
            });
            return res.status(200).json(result);
        };
        this.getContractLists = async (req, res) => {
            const { query, userId } = this.validateOrThrow(contract_schema_request_1.getContractListReqSchema, {
                query: req.query,
                userId: req.userId,
            });
            const result = await this._contractService.getContractLists(userId, query);
            return res.json(result);
        };
        this.getContractCars = async (req, res) => {
            const result = await this._contractService.getContractCars(req.userId);
            return res.json(result);
        };
        this.getContractCustomers = async (req, res) => {
            const result = await this._contractService.getContractCustomers(req.userId);
            return res.json(result);
        };
        this.getContractUsers = async (req, res) => {
            const result = await this._contractService.getContractUsers(req.userId);
            return res.json(result);
        };
        this.deleteContract = async (req, res) => {
            const { params, userId } = this.validateOrThrow(contract_schema_request_1.deleteContractReqSchema, {
                params: req.params,
                userId: req.userId,
            });
            await this._contractService.deleteContract({
                userId: userId,
                contractId: params.contractId,
            });
            return res.status(200).json({ message: "계약 삭제 성공" });
        };
    }
}
exports.ContractController = ContractController;
//# sourceMappingURL=contract.controller.js.map