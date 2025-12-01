"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoFactory = void 0;
class RepoFactory {
    constructor(factories) {
        this._repoGenerators = factories;
    }
    create(prismaClient) {
        return {
            user: this._repoGenerators.user(prismaClient),
            company: this._repoGenerators.company(prismaClient),
            car: this._repoGenerators.car(prismaClient),
            customer: this._repoGenerators.customer(prismaClient),
            contract: this._repoGenerators.contract(prismaClient),
            contractDoc: this._repoGenerators.contractDoc(prismaClient),
        };
    }
}
exports.RepoFactory = RepoFactory;
//# sourceMappingURL=repo-factory.js.map