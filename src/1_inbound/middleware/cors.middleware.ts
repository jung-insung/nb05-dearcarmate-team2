import cors from "cors"
import { IConfigUtil } from "../../4_shared/port/config.util.interface";
import { BusinessException } from "../../4_shared/exceptions/business.exceptions/business.exception";

export class CorsMiddleware {
  private _option: cors.CorsOptions;

  constructor(private _configManager: IConfigUtil) {
    const protocol = this._configManager.getParsed().NODE_ENV === "dev" ? "http" : "https";
    const clientDomain = this._configManager.getParsed().NODE_ENV === "dev"
      ? `localhost:${this._configManager.getParsed().PORT}`
      : this._configManager.getParsed().CLIENT_DOMAIN;
    const whitelist = [
      `${protocol}://${clientDomain}`,
      `${protocol}://www.${clientDomain}`
    ];

    this._option = {
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new BusinessException({message: "허용되지 않은 도메인 요청입니다."}));
        }
      },
      credentials: true,
    };
  }

  handler = () => {
    return cors(this._option);
  }
}
