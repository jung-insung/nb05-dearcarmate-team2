import { ContractEntity } from "../../2_domain/entities/contract/contract.entity";
import { AlarmTime } from "../../2_domain/entities/contract/contract.enum";
import {
  ContractRecord,
  MeetingEn,
} from "../../2_domain/entities/contract/contract.entity.util";

export class ContractMapper {
  static toCreateData(entity: ContractEntity) {
    const contractData = entity.toCreateData();

    const meetingsData = entity.meetings.map((m) => ({
      date: m.date,
      alarms: m.alarms as any,
    }));

    return {
      contract: contractData,
      meetings: meetingsData,
    };
  }

  static toUpdateData(entity: ContractEntity) {
    const contractData = entity.toUpdateData();

    const meetingsData = entity.meetings.map((m) => ({
      date: m.date,
      alarms: m.alarms as any,
    }));

    return {
      contract: contractData,
      meeting: {
        deleteMany: {},
        create: meetingsData,
      },
    };
  }

  static toPersistEntity(record: ContractRecord): ContractEntity {
    const meetings: MeetingEn[] =
      record.meeting?.map((m) => ({
        id: m.id,
        contractId: m.contractId,
        date: m.date,
        version: m.version,
        alarms: m.alarms,
      })) ?? [];

    return ContractEntity.createPersist({
      ...record,
      meetings,
      contractDocuments: record.contractDocuments ?? [],
    });
  }

  static toResponse(
    entity: ContractEntity,
    relations?: {
      user?: { id: number; name: string };
      customer?: { id: number; name: string };
      car?: { id: number; model: string };
    },
  ) {
    return {
      id: entity.id,
      status: entity.status,
      
      resolutionDate: entity.resolutionDate
      ? this.formatDateTime(entity.resolutionDate)
      : null,

      contractPrice: entity.contractPrice,
      meetings: entity.meetings.map((m) => ({
        date: this.formatDate(m.date),

        alarms: m.alarms.map((alarmEnum) =>
          this.formatDateTime(this.calculateAlarmTime(m.date, alarmEnum)),
        ),
      })),

      contractDocuments: entity.contractDocuments.map((d) => ({
        id: d.id,
        fileName: d.fileName,
      })),

      user: relations?.user ?? { id: entity.userId },
      customer: relations?.customer ?? { id: entity.customerId },
      car: relations?.car ?? { id: entity.carId },
    };
  }

  private static calculateAlarmTime(meetingDate: Date, type: AlarmTime): Date {
    const target = new Date(meetingDate);
    target.setHours(9, 0, 0, 0);
    if (type === AlarmTime.DAY_BEFORE_9AM) {
      target.setDate(target.getDate() - 1);
    }

    return target;
  }

  private static formatDate(date: Date): string {
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  private static formatDateTime(date: Date): string {
    return date.toISOString().slice(0, 19); // YYYY-MM-DDTHH:mm:ss
  }
}
