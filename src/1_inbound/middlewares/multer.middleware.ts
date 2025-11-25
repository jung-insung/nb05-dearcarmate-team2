import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path"

export class MulterMiddleware {
  public upload;

  constructor() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../public/files'));
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
      }
    })

    this.upload = multer({ storage });
  }

  contractDocUploadHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.body.fileName = req.file ? req.file.originalname : null
      req.body.filePath = req.file ? req.file.path : null;
      next();
    } catch (err) {
      next(err);
    }
  }
}
