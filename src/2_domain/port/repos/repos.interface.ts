import { ICustomerRepo } from "../../../3_outbound/repos/customer.repo";
import { ICompanyRepo } from "./company.repo.interface";
import { IUserRepo } from "./user.repo.interface";
import { ICarRepo } from "./car.repo.interface";

export interface IRepos {
  user: IUserRepo;
  company: ICompanyRepo;
  car: ICarRepo;
  // customer: ICustomerRepo
}
