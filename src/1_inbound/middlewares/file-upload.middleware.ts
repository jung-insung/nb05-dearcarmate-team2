import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

export class FileUploadMiddleware {
  public upload;

  constructor() {
    const csvPath = path.join(__dirname, "../../../public/csv");
    if (!fs.existsSync(csvPath)) {
      fs.mkdirSync(csvPath, { recursive: true });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === "contractDoc") {
          cb(null, path.join(__dirname, "../../../public/contractDocs"));
        } else if (file.fieldname === "image") {
          cb(null, path.join(__dirname, "../../../public/images"));
        } else if (file.fieldname === "file") {
          cb(null, path.join(__dirname, "../../../public/csv"));
        }
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
      },
    });

    this.upload = multer({
      storage,
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    });
  }

  contractDocUploadHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.body.fileName = req.file ? req.file.originalname : null;
      req.body.filePath = req.file ? req.file.path : null;
      next();
    } catch (err) {
      next(err);
    }
  };

  imageUploadHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.fileName = req.file ? req.file.originalname : null;
      req.body.url = req.file
        ? `http://localhost:4000/${req.file.path.replace(/\\/g, "/")}`
        : null;
      next();
    } catch (err) {
      next(err);
    }
  };

  csvUploadHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.filePath = req.file ? req.file.path : null;
      next();
    } catch (err) {
      next(err);
    }
  };
}
