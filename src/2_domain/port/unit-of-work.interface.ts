import { TransactionOptions } from "../../3_outbound/unit-of-work";
import { IRepos } from "./repos/repos.interface";

export interface IUnitOfWork {
  repos: IRepos;

  do<T>(
    work: (txRepos: IRepos) => Promise<T>,
    isOptimistic?: boolean,
    isTransaction?: TransactionOptions,
  ): Promise<T>;
}
