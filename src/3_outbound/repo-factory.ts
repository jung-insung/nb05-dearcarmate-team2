import { IRepos } from "../2_domain/port/repos/repos.interface";
import { BasePrismaClient } from "./repos/base.repo";

type RepoGenerator<K extends keyof IRepos> = (
  client: BasePrismaClient,
) => IRepos[K];

export class RepoFactory {
  private _repoGenerators: { [K in keyof IRepos]: RepoGenerator<K> };

  constructor(factories: { [K in keyof IRepos]: RepoGenerator<K> }) {
    this._repoGenerators = factories;
  }

  public create(prismaClient: BasePrismaClient): IRepos {
    return {
      user: this._repoGenerators.user(prismaClient),
      company: this._repoGenerators.company(prismaClient),
    };
  }
}
