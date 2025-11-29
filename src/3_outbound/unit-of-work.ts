import { PrismaClient } from "@prisma/client";
import { IRepos } from "../2_domain/port/repos/repos.interface";
import { IUnitOfWork } from "../2_domain/port/unit-of-work.interface";
import { IConfigUtil } from "../4_shared/port/config.util.interface";
import { RepoFactory } from "./repo-factory";
import { TechnicalException } from "../4_shared/exceptions/technical.exceptions/technical.exception";
import { TechnicalExceptionType } from "../4_shared/exceptions/technical.exceptions/exception-info";

export type TransactionOptions =
  | {
    useTransaction: false;
  }
  | {
    useTransaction: true;
    isolationLevel: "ReadCommitted" | "RepeatableRead" | "Serializable";
  };

export class UnitOfWork implements IUnitOfWork {
  private _repos: IRepos;

  constructor(
    private readonly _prismaClient: PrismaClient,
    private readonly _repoFactory: RepoFactory,
    private readonly _configUtil: IConfigUtil,
  ) {
    this._repos = this._repoFactory.create(this._prismaClient);
  }

  get repos(): IRepos {
    return this._repos;
  }

  async do<T>(
    work: (repos: IRepos) => Promise<T>,
    isOptimistic: boolean = true,
    isTransaction: TransactionOptions = {
      useTransaction: false
    }
  ): Promise<T> {
    let lastErr: unknown;

    const maxRetries = isOptimistic
      ? this._configUtil.getParsed().MAX_RETRIES
      : 0;


    for (let i = 0; i <= maxRetries; i++) {
      if (i > 0) {
        console.warn(`재시도 ${i}/${maxRetries}회차`);
      }
      try {
        if (!isTransaction.useTransaction) {
          return await work(this.repos);
        }

        return await this._prismaClient.$transaction(
          async (tx) => {
            const txRepos: IRepos = this._repoFactory.create(tx);
            return await work(txRepos);
          },
          {
            isolationLevel: isTransaction.isolationLevel,
            maxWait: 5000,
            timeout: 5000,
          },
        );
      } catch (err) {
        if (
          err instanceof TechnicalException &&
          err.type === TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED &&
          i < maxRetries
        ) {
          const baseDelay =
            this._configUtil.getParsed().OPTIMISTIC_LOCK_RETRY_DELAY_MS;
          const jitter = Math.random() * 100;
          const delay = Math.pow(2, i) * baseDelay + jitter;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        lastErr = err;
        break;
      }
    }
    throw lastErr;
  }
}
