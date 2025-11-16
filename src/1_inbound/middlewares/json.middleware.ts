import express from "express";
import { IConfigUtil } from "../../4_shared/port/config.util.interface";

export class JsonMiddleware {
  private _options;

  constructor(private _configUtil: IConfigUtil) {
    this._options = {
      limit: this._configUtil.getParsed().JSON_LIMIT,
    };
  }

  handler = () => {
    return express.json(this._options);
  };
}