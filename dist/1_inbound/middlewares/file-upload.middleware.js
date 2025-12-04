"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
class FileUploadMiddleware {
    constructor() {
        this.contractDocUploadHandler = (req, res, next) => {
            try {
                req.body.fileName = req.file ? req.file.originalname : null;
                req.body.filePath = req.file ? req.file.path : null;
                next();
            }
            catch (err) {
                next(err);
            }
        };
        this.imageUploadHandler = (req, res, next) => {
            try {
                const fileName = req.file.filename;
                req.body.fileName = req.file.originalname;
                req.body.url = `http://localhost:4000/uploads/${fileName}`;
                next();
            }
            catch (err) {
                next(err);
            }
        };
        const storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path_1.default.join(__dirname, "../../../public"));
            },
            filename: function (req, file, cb) {
                const uniqueName = Date.now() + "-" + file.originalname;
                cb(null, uniqueName);
            },
        });
        this.upload = (0, multer_1.default)({ storage });
    }
}
exports.FileUploadMiddleware = FileUploadMiddleware;
//# sourceMappingURL=file-upload.middleware.js.map