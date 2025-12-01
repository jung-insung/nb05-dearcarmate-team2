"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDocMapper = void 0;
const contract_doc_view_entity_1 = require("../../2_domain/entities/cotract-doc/contract-doc-view.entity");
const contract_doc_entity_1 = require("../../2_domain/entities/cotract-doc/contract-doc.entity");
class ContractDocMapper {
    static toCreateData(entity) {
        return {
            fileName: entity.fileName,
            filePath: entity.filePath,
        };
    }
    static toPersistEntity(record) {
        return new contract_doc_entity_1.ContractDocEntity({
            id: record.id,
            contractId: record.contractId || undefined,
            fileName: record.fileName,
            filePath: record.filePath,
            createdAt: record.createdAt,
            updatedAt: record.updatedAt,
        });
    }
    static toContractDocViewEntity(record) {
        return new contract_doc_view_entity_1.ContractDocViewEntity({
            contractId: record.id,
            contractName: `${record.car.model} - ${record.customer.name} 고객님`,
            resolutionDate: record.resolutionDate,
            documentCount: record.documents.length,
            userName: record.user.name,
            carNumber: record.car.carNumber,
            documents: record.documents,
        });
    }
}
exports.ContractDocMapper = ContractDocMapper;
//# sourceMappingURL=contract-doc.mapper.js.map