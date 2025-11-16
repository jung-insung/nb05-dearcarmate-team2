import morgan from "morgan";
import { IConfigUtil } from "../../4_shared/port/config.util.interface";

export class LoggerMiddleware {
  private _format : string;
  constructor(private _configUtil : IConfigUtil) {
    this._format = this._configUtil.getParsed().NODE_ENV === "dev"
    ? "dev"
    : "combined"
  }

  handler = () => {
    return morgan(this._format);
  }
}