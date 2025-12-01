"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingEntity = void 0;
const business_exception_1 = require("../../../4_shared/exceptions/business.exceptions/business.exception");
const exception_info_1 = require("../../../4_shared/exceptions/business.exceptions/exception-info");
const contract_enum_1 = require("./contract.enum");
class MeetingEntity {
    constructor(attrs) {
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
    static createNew(params) {
        // const meetingDate = new Date(params.date);
        // this.validateMeetingTime(meetingDate);
        const dateStr = params.date.toString();
        if (!params.alarms || params.alarms.length === 0) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.BAD_REQUEST,
                message: "알람을 최소 1개 이상 선택해야 합니다.",
            });
        }
        const meetingDate = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
            ? new Date(`${dateStr}T12:00:00`)
            : new Date(dateStr);
        const alarms = [];
        if (params.alarms && params.alarms.length > 0) {
            for (const alarmInput of params.alarms) {
                const alarmEnum = this.convertDateToAlarmEnum(meetingDate, new Date(alarmInput));
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
    static convertDateToAlarmEnum(meetingDate, alarmDate) {
        const alarmTime = alarmDate.getTime();
        const onDay9am = new Date(meetingDate);
        onDay9am.setHours(9, 0, 0, 0);
        const dayBefore9am = new Date(meetingDate);
        dayBefore9am.setDate(dayBefore9am.getDate() - 1);
        dayBefore9am.setHours(9, 0, 0, 0);
        if (alarmTime === onDay9am.getTime()) {
            return contract_enum_1.AlarmTime.ON_DAY_9AM;
        }
        if (alarmTime === dayBefore9am.getTime()) {
            return contract_enum_1.AlarmTime.DAY_BEFORE_9AM;
        }
        return undefined;
    }
    static validateMeetingTime(meetingDate) {
        const mDate = new Date(meetingDate);
        const hour = mDate.getHours();
        const minute = mDate.getMinutes();
        const timeValue = hour * 60 + minute;
        const startLimit = 9 * 60 + 30;
        const endLimit = 18 * 60;
        if (timeValue < startLimit || timeValue > endLimit) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.BAD_REQUEST,
            });
        }
        if (minute !== 0 && minute !== 30) {
            throw new business_exception_1.BusinessException({
                type: exception_info_1.BusinessExceptionType.BAD_REQUEST,
            });
        }
    }
}
exports.MeetingEntity = MeetingEntity;
//# sourceMappingURL=meeting.entity.js.map