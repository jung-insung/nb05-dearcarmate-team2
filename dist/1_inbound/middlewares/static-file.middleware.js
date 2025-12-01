"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticFileMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class StaticFileMiddleware {
    constructor(basePath, folderPath) {
        this.basePath = basePath;
        this.folderPath = folderPath;
        this.handler = () => {
            return express_1.default.static(path_1.default.join(__dirname, this.folderPath));
        };
    }
}
exports.StaticFileMiddleware = StaticFileMiddleware;
//# sourceMappingURL=static-file.middleware.js.map