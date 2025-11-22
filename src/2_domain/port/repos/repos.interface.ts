import { ICompanyRepo } from "./company.repo.interface";
import { IUserRepo } from "./user.repo.interface";
import { ICarRepo } from "./car.repo.interface";
import { ICustomerRepo } from "./customer.repo.interface";

export interface IRepos {
  user: IUserRepo;
  company: ICompanyRepo;
  car: ICarRepo;
  customer: ICustomerRepo;
}
