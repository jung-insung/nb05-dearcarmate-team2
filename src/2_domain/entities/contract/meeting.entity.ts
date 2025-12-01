import { BusinessException } from "../../../4_shared/exceptions/business.exceptions/business.exception";
import { BusinessExceptionType } from "../../../4_shared/exceptions/business.exceptions/exception-info";
import { AlarmTime } from "./contract.enum";
import { MeetingEn, NewMeetingParams } from "./contract.entity.util";

export class MeetingEntity {
  private readonly _id?: number;
  private readonly _contractId?: number;
  private _date: Date;
  private _alarms: AlarmTime[];
  private _version: number;

  constructor(attrs: MeetingEn) {
    this._id = attrs.id;
    this._contractId = attrs.contractId;
    this._date = new Date(attrs.date);
    this._alarms = attrs.alarms ?? [];
    this._version = attrs.version ?? 1;
  }

  get date() {
    return this._date;
  }
  get alarms() {
    return this._alarms;
  }

  static createNew(params: NewMeetingParams): MeetingEntity {
    // const meetingDate = new Date(params.date);

    // this.validateMeetingTime(meetingDate);

    const dateStr = params.date.toString();
    if (!params.alarms || params.alarms.length === 0) {
      throw new BusinessException({
        type: BusinessExceptionType.BAD_REQUEST,
        message: "알람을 최소 1개 이상 선택해야 합니다.",
      });
    }

    const meetingDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
      ? new Date(`${dateStr}T12:00:00`)
      : new Date(dateStr);

    const alarms: AlarmTime[] = [];
    if (params.alarms && params.alarms.length > 0) {
      for (const alarmInput of params.alarms) {
        const alarmEnum = this.convertDateToAlarmEnum(
          meetingDate,
          new Date(alarmInput),
        );

        if (alarmEnum) {
          alarms.push(alarmEnum);
        }
      }
    }

    return new MeetingEntity({
      date: meetingDate,
      alarms,
    });
  }

  private static convertDateToAlarmEnum(
    meetingDate: Date,
    alarmDate: Date,
  ): AlarmTime | undefined {
    const alarmTime = alarmDate.getTime();

    const onDay9am = new Date(meetingDate);
    onDay9am.setHours(9, 0, 0, 0);

    const dayBefore9am = new Date(meetingDate);
    dayBefore9am.setDate(dayBefore9am.getDate() - 1);
    dayBefore9am.setHours(9, 0, 0, 0);

    if (alarmTime === onDay9am.getTime()) {
      return AlarmTime.ON_DAY_9AM;
    }
    if (alarmTime === dayBefore9am.getTime()) {
      return AlarmTime.DAY_BEFORE_9AM;
    }
    return undefined;
  }

  private static validateMeetingTime(meetingDate: Date): void {
    const mDate = new Date(meetingDate);
    const hour = mDate.getHours();
    const minute = mDate.getMinutes();
    const timeValue = hour * 60 + minute;

    const startLimit = 9 * 60 + 30;
    const endLimit = 18 * 60;

    if (timeValue < startLimit || timeValue > endLimit) {
      throw new BusinessException({
        type: BusinessExceptionType.BAD_REQUEST,
      });
    }

    if (minute !== 0 && minute !== 30) {
      throw new BusinessException({
        type: BusinessExceptionType.BAD_REQUEST,
      });
    }
  }
}
