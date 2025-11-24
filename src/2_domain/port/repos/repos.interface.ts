import { ICompanyRepo } from "./company.repo.interface";
import { IUserRepo } from "./user.repo.interface";
import { ICarRepo } from "./car.repo.interface";
import { ICustomerRepo } from "./customer.repo.interface";
import { IContractDocRepo } from "./contract-doc.repo.interface";
import { IContractRepo } from "./contract.repo.interface";

export interface IRepos {
  user: IUserRepo;
  company: ICompanyRepo;
  car: ICarRepo;
  customer: ICustomerRepo;
  contract: IContractRepo;
  contractDoc: IContractDocRepo;
}
