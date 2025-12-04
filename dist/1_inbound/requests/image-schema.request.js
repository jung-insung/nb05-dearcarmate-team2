"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadReqSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.imageUploadReqSchema = zod_1.default.object({
    userId: zod_1.default.number({ message: "유저 ID는 숫자이어야 합니다." }),
    body: zod_1.default.object({
        fileName: zod_1.default
            .string({ message: "파일명은 문자열이어야 합니다." })
            .nonempty({ message: "파일명은 필수 입력 항목입니다." })
            .trim(),
        url: zod_1.default.url({ message: "url 형식이 맞지 않습니다." }),
    }),
});
//# sourceMappingURL=image-schema.request.js.map