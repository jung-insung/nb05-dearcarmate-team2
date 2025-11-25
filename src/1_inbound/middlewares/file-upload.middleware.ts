import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

export class FileUploadMiddleware {
  public upload;

  constructor() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        if (file.fieldname === "contractDoc") {
          cb(null, path.join(__dirname, '../../../public/contractDocs'));

        } else if (file.fieldname === "image") {
          cb(null, path.join(__dirname, '../../../public/images'));
        }
      },
      filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
      },
    });

    this.upload = multer({ storage });
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
<<<<<<< Updated upstream:src/1_inbound/middlewares/file-upload.middleware.ts
  }

  imageUploadHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      req.body.fileName = req.file ? req.file.originalname : null
      req.body.url = req.file ? `http://localhost:4000/${req.file.path.replace(/\\/g, "/")}` : null;
      next();
    } catch (err) {
      next(err);
    }
  }
=======
  };
>>>>>>> Stashed changes:src/1_inbound/middlewares/multer.middleware.ts
}
