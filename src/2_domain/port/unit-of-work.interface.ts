import { IRepos } from "./repos/repos.interface";

export interface IUnitOfWork {
  repos: IRepos;

  do<T>(
    work: (txRepos: IRepos) => Promise<T>,
    isOptimistic?: boolean,
    isolationLevel?: "ReadCommitted" | "RepeatableRead" | "Serializable",
  ): Promise<T>;
}
