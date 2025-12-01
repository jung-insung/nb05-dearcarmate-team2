"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitOfWork = void 0;
const technical_exception_1 = require("../4_shared/exceptions/technical.exceptions/technical.exception");
const exception_info_1 = require("../4_shared/exceptions/technical.exceptions/exception-info");
class UnitOfWork {
    constructor(_prismaClient, _repoFactory, _configUtil) {
        this._prismaClient = _prismaClient;
        this._repoFactory = _repoFactory;
        this._configUtil = _configUtil;
        this._repos = this._repoFactory.create(this._prismaClient);
    }
    get repos() {
        return this._repos;
    }
    async do(work, isOptimistic = true, isTransaction = {
        useTransaction: false
    }) {
        let lastErr;
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
                return await this._prismaClient.$transaction(async (tx) => {
                    const txRepos = this._repoFactory.create(tx);
                    return await work(txRepos);
                }, {
                    isolationLevel: isTransaction.isolationLevel,
                    maxWait: 5000,
                    timeout: 5000,
                });
            }
            catch (err) {
                if (err instanceof technical_exception_1.TechnicalException &&
                    err.type === exception_info_1.TechnicalExceptionType.OPTIMISTIC_LOCK_FAILED &&
                    i < maxRetries) {
                    const baseDelay = this._configUtil.getParsed().OPTIMISTIC_LOCK_RETRY_DELAY_MS;
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
exports.UnitOfWork = UnitOfWork;
//# sourceMappingURL=unit-of-work.js.map