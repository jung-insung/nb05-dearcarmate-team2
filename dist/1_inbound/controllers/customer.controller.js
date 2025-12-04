"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const base_controller_1 = require("./base.controller");
const customer_schema_request_1 = require("../requests/customer-schema.request");
class CustomerController extends base_controller_1.BaseController {
    constructor(_customerService) {
        super();
        this._customerService = _customerService;
        this.registCustomer = async (req, res) => {
            const userId = req.userId;
            const dto = this.validateOrThrow(customer_schema_request_1.registCustomerSchema, { body: req.body });
            const newCusotmer = await this._customerService.registCustomer({
                dto,
                userId,
            });
            res.status(201).json(newCusotmer);
        };
        this.getCustomers = async (req, res) => {
            const userId = req.userId;
            const query = this.validateOrThrow(customer_schema_request_1.getCustomersQuerySchema, req.query);
            const { page, pageSize, searchBy, keyword } = query;
            const customers = await this._customerService.getCustomers({
                userId,
                page,
                pageSize,
                searchBy,
                keyword,
            });
            return res.status(200).json(customers);
        };
        this.getCustomer = async (req, res) => {
            const customerId = Number(req.params.customerId);
            const customer = await this._customerService.getCustomer(customerId);
            return res.status(200).json(customer);
        };
        this.updateCustomer = async (req, res) => {
            const customerId = Number(req.params.customerId);
            const dto = this.validateOrThrow(customer_schema_request_1.updateCustomerSchema, { body: req.body });
            const updatedCustomer = await this._customerService.updateCustomer({
                customerId,
                dto,
            });
            res.status(200).json(updatedCustomer);
        };
        this.deleteCusomer = async (req, res) => {
            const customerId = Number(req.params.customerId);
            await this._customerService.deleteCustomer(customerId);
            res.status(200).json({ message: "고객 삭제 성공" });
        };
        this.uploadCustomers = async (req, res) => {
            const userId = req.userId;
            await this._customerService.uploadCustomers({ userId, req });
            res.status(200).json({ message: "고객 정보가 등록되었습니다" });
        };
    }
}
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.controller.js.map