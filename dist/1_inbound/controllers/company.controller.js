"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const base_controller_1 = require("./base.controller");
const company_schema_request_1 = require("../requests/company-schema.request");
class CompanyController extends base_controller_1.BaseController {
    constructor(_companyService) {
        super();
        this._companyService = _companyService;
        this.getCompanyList = async (req, res) => {
            const { query, userId } = this.validateOrThrow(company_schema_request_1.getCompanyListReqSchema, {
                query: req.query,
                userId: req.userId,
            });
            const result = await this._companyService.getCompanyList(query, userId);
            return res.status(200).json(result);
        };
        this.getUserList = async (req, res) => {
            const { query, userId } = this.validateOrThrow(company_schema_request_1.getUserListReqSchema, {
                query: req.query,
                userId: req.userId,
            });
            const result = await this._companyService.getUserList(query, userId);
            return res.status(200).json(result);
        };
        this.createCompany = async (req, res) => {
            const { body, userId } = this.validateOrThrow(company_schema_request_1.createCompanyReqSchema, {
                body: req.body,
                userId: req.userId,
            });
            const newCompany = await this._companyService.createCompany(body, userId);
            return res.status(201).json(newCompany);
        };
        this.updateCompany = async (req, res) => {
            const { params, body, userId } = this.validateOrThrow(company_schema_request_1.updateCompanyReqSchema, { params: req.params, body: req.body, userId: req.userId });
            const updatedCompany = await this._companyService.updateCompany(params.companyId, body, userId);
            return res.status(200).json(updatedCompany);
        };
        this.deleteCompany = async (req, res) => {
            const { params, userId } = this.validateOrThrow(company_schema_request_1.deleteCompanyReqSchema, {
                params: req.params,
                userId: req.userId,
            });
            await this._companyService.deleteCompany(params.companyId, userId);
            return res.status(200).json({ message: "회사 삭제 성공" });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map