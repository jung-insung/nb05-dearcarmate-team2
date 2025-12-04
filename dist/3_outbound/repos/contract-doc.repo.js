"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocRepo = void 0;
const base_repo_1 = require("./base.repo");
const contract_doc_mapper_1 = require("../mappers/contract-doc.mapper");
class ContractDocRepo extends base_repo_1.BaseRepo {
    constructor(prisma) {
        super(prisma);
    }
    async findContractDocById(id) {
        const foundContractDoc = await this._prisma.contractDocument.findUnique({
            where: { id },
        });
        return contract_doc_mapper_1.ContractDocMapper.toPersistEntity(foundContractDoc);
    }
    async create(entity) {
        const newContractDoc = await this._prisma.contractDocument.create({
            data: {
                ...contract_doc_mapper_1.ContractDocMapper.toCreateData(entity),
            },
        });
        return contract_doc_mapper_1.ContractDocMapper.toPersistEntity(newContractDoc);
    }
}
exports.ContractDocRepo = ContractDocRepo;
//# sourceMappingURL=contract-doc.repo.js.map