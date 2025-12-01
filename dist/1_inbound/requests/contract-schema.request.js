"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContractReqSchema = exports.createContractReqSchema = exports.updateContractReqSchema = exports.DocumentItemSchema = exports.MeetingItemSchema = exports.ALARM_TIME_KEYS = exports.CONTRACT_STATUS_KEYS = exports.getContractReqSchema = exports.getContractListReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.getContractListReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    query: zod_1.default.object({
        page: zod_1.default.coerce.number().min(1).default(1),
        pageSize: zod_1.default.coerce.number().min(1).default(1000),
        searchBy: zod_1.default.enum(["customerName", "userName"]).optional(),
        keyword: zod_1.default.string().optional(),
    }),
});
exports.getContractReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    params: zod_1.default.object({
        contractId: zod_1.default.coerce.number({ message: "계약 ID는 숫자여야 합니다." }),
    }),
});
const ISO_DATETIME_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
exports.CONTRACT_STATUS_KEYS = [
    "CAR_INSPECTION",
    "PRICE_NEGOTIATION",
    "CONTRACT_DRAFT",
    "CONTRACT_SUCCESSFUL",
    "CONTRACT_FAILED",
];
const statusMapping = {
    carinspection: "CAR_INSPECTION",
    pricenegotiation: "PRICE_NEGOTIATION",
    contractdraft: "CONTRACT_DRAFT",
    contractsuccessful: "CONTRACT_SUCCESSFUL",
    contractfailed: "CONTRACT_FAILED",
};
exports.ALARM_TIME_KEYS = ["DAY_BEFORE_9AM", "ON_DAY_9AM"];
exports.MeetingItemSchema = zod_1.default.object({
    date: zod_1.default.string().regex(ISO_DATETIME_REGEX),
    alarms: zod_1.default.array(zod_1.default.string().regex(ISO_DATETIME_REGEX)).max(3),
});
exports.DocumentItemSchema = zod_1.default.object({
    id: zod_1.default.number().int(),
    fileName: zod_1.default.string().min(1),
});
exports.updateContractReqSchema = zod_1.default.object({
    body: zod_1.default.object({
        status: zod_1.default
            .string()
            .transform((val) => {
            const upper = val.toUpperCase();
            if (exports.CONTRACT_STATUS_KEYS.includes(upper)) {
                return upper;
            }
            const lower = val.toLowerCase().replace(/[_-]/g, "");
            return statusMapping[lower] || val;
        })
            .pipe(zod_1.default.enum(exports.CONTRACT_STATUS_KEYS))
            .nullable()
            .optional(),
        userId: zod_1.default.number().int().positive().optional(),
        customerId: zod_1.default.number().int().positive().optional(),
        carId: zod_1.default.number().int().positive().optional(),
        resolutionDate: zod_1.default.string().regex(ISO_DATETIME_REGEX).nullable().optional(),
        contractPrice: zod_1.default.number().int().positive().optional(),
        meetings: zod_1.default.array(exports.MeetingItemSchema).optional(),
        contractDocuments: zod_1.default.array(exports.DocumentItemSchema).optional(),
    }),
});
const CreateMeetingItemSchema = zod_1.default.object({
    date: zod_1.default.string().regex(ISO_DATETIME_REGEX),
    alarms: zod_1.default.array(zod_1.default.string().regex(ISO_DATETIME_REGEX)).max(3),
});
exports.createContractReqSchema = zod_1.default.object({
    body: zod_1.default.object({
        carId: zod_1.default.number(),
        customerId: zod_1.default.number(),
        meetings: zod_1.default.array(CreateMeetingItemSchema).optional(),
    }),
});
exports.deleteContractReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    params: zod_1.default.object({
        contractId: zod_1.default.coerce.number({ message: "계약 ID는 숫자여야 합니다." }),
    }),
});
//# sourceMappingURL=contract-schema.request.js.map