"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractDocDownLoadReqSchema = exports.contractDocUploadReqSchema = exports.contractDocDraftListReqSchema = exports.contractDocListReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.contractDocListReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    query: zod_1.default.object({
        page: zod_1.default.coerce.number().default(1),
        pageSize: zod_1.default.coerce.number().default(8),
        searchBy: zod_1.default
            .enum(["contractName", "userName", "carNumber"])
            .default("contractName"),
        keyword: zod_1.default.string().optional(),
    }),
});
exports.contractDocDraftListReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
});
exports.contractDocUploadReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    body: zod_1.default.object({
        fileName: zod_1.default
            .string({ message: "파일명은 문자열이어야 합니다." })
            .nonempty({ message: "파일명은 필수 입력 항목입니다." })
            .trim(),
        filePath: zod_1.default
            .string({ message: "파일 경로는 문자열이어야 합니다." })
            .nonempty({ message: "파일 경로는 필수 입력 항목입니다." })
            .trim(),
    }),
});
exports.contractDocDownLoadReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    params: zod_1.default.object({
        contractDocId: zod_1.default.coerce.number({
            message: "계약서 ID는 숫자이어야 합니다.",
        }),
    }),
});
//# sourceMappingURL=contract-doc-schema.request.js.map