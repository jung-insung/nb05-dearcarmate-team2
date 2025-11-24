import { NextFunction, Request, Response } from "express";
import multer from "multer";

export class MulterMiddleware {
  public upload;

  constructor() {
    this.upload = multer({ storage: multer.memoryStorage() });
  }

  contractDocUploadHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.body.fileName = req.file ? req.file.originalname : null;
      next();
    } catch (err) {
      next(err);
    }
  };
}
