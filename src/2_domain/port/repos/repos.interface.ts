import { ICompanyRepo } from "../../../3_outbound/repos/company.repo";
import { IUserRepo } from "./user.repo.interface";

export interface IRepos {
  user: IUserRepo;
  company: ICompanyRepo;
}
