import dotenv from "dotenv";
import {
  configSchema,
  ConfigType,
  IConfigUtil,
} from "../port/config.util.interface";

export class ConfigUtil implements IConfigUtil {
  private _parseConfig: ConfigType;

  constructor() {
    dotenv.config({
      path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env",
    });

    const result = configSchema.safeParse(process.env);
    if (result.success) {
      this._parseConfig = result.data;
    } else {
      throw result.error;
    }
  }

  public getParsed() {
    return this._parseConfig;
  }
}
