import { TimeRange } from '@/features/store/apis/store.api-gen';
import { intervalToDuration, formatDuration } from 'date-fns';

export type Time = {
	hour: number;
	minute: number;
}

export type CalendarDay = {
	date: number;
	isCurrentMonth: boolean;
	isToday: boolean;
}

class TimeUtil {
	static isValidTime(time: Time): boolean {
		return (
			Number.isInteger(time.hour) && Number.isInteger(time.minute) &&
			time.hour >= 0 && time.hour < 24 &&
			time.minute >= 0 && time.minute < 60
		);
	}

	static isEqual(time1: Time, time2: Time): boolean {
		return time1.hour === time2.hour && time1.minute === time2.minute;
	}

	static toString(time: Time): string {
		const hour = time.hour.toString().padStart(2, '0');
		const minute = time.minute.toString().padStart(2, '0');
		return `${hour}:${minute}`;
	}

	static toString12HourFormat(time: Time): string {
		const hour = time.hour % 12 || 12; // Convert to 12-hour format
		const minute = time.minute.toString().padStart(2, '0');
		const period = time.hour < 12 ? 'AM' : 'PM';
		return `${hour}:${minute} ${period}`;
	}

	static formatMinute(minutes: number): string {
		const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 });
		return formatDuration(duration, { format: ['minutes'] }) + " mins";
	}

	static formatTimeRanges = (ranges: TimeRange[]): string => {
		return ranges.map(range => {
			const startTime = TimeUtil.toString(range.start);
			const endTime = TimeUtil.toString(range.end);
			return `${startTime} - ${endTime}`;
		}).join(", ");
	}

	static generateCalendarDays = (currentMonthDate: Date): CalendarDay[] => {
		const year = currentMonthDate.getFullYear();
		const month = currentMonthDate.getMonth();

		// First day of the month
		const firstDay = new Date(year, month, 1).getDay();

		// Days in current month
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		// Days in previous month
		const daysInPrevMonth = new Date(year, month, 0).getDate();

		const days = [];

		// Previous month days
		for (let i = firstDay - 1; i >= 0; i--) {
			days.push({
				date: daysInPrevMonth - i,
				isCurrentMonth: false,
				isToday: false
			});
		}

		// Current month days
		const today = new Date();
		for (let i = 1; i <= daysInMonth; i++) {
			days.push({
				date: i,
				isCurrentMonth: true,
				isToday: today.getDate() === i &&
					today.getMonth() === month &&
					today.getFullYear() === year
			});
		}

		// Next month days
		const remainingDays = 42 - days.length; // 6 rows * 7 columns = 42 cells
		for (let i = 1; i <= remainingDays; i++) {
			days.push({
				date: i,
				isCurrentMonth: false,
				isToday: false
			});
		}

		return days;
	}

	static reduceOverlappingTimeRanges = (ranges: TimeRange[]): TimeRange[] => {
		ranges.sort((a, b) => {
			const startA = a.start.hour * 60 + a.start.minute;
			const startB = b.start.hour * 60 + b.start.minute;
			return startA - startB;
		});

		const reducedRanges: TimeRange[] = [];

		ranges.forEach(range => {
			if (reducedRanges.length === 0) {
				reducedRanges.push(range);
			} else {
				const lastRange = reducedRanges[reducedRanges.length - 1];
				const lastEndMinutes = lastRange.end.hour * 60 + lastRange.end.minute;
				const currentStartMinutes = range.start.hour * 60 + range.start.minute;

				if (currentStartMinutes <= lastEndMinutes) {
					lastRange.end = {
						hour: Math.max(lastRange.end.hour, range.end.hour),
						minute: Math.max(lastRange.end.minute, range.end.minute),
					};
				} else {
					reducedRanges.push(range);
				}
			}
		});

		return reducedRanges;
	}

	static generateTimeSlots = (ranges: TimeRange[], intervals: number = 15): Time[] => {
		const timeSlots: Time[] = [];
		const reducedRanges = TimeUtil.reduceOverlappingTimeRanges(ranges);

		reducedRanges.forEach(range => {
			const startMinutes = range.start.hour * 60 + range.start.minute;
			const endMinutes = range.end.hour * 60 + range.end.minute;

			for (let minutes = startMinutes; minutes < endMinutes; minutes += intervals) {
				const hour = Math.floor(minutes / 60);
				const minute = minutes % 60;
				timeSlots.push({ hour, minute });
			}
		});

		return timeSlots;
	}

	static isTimeInRange = (time: Time, range: TimeRange): boolean => {
		const timeMinutes = time.hour * 60 + time.minute;
		const startMinutes = range.start.hour * 60 + range.start.minute;
		const endMinutes = range.end.hour * 60 + range.end.minute;

		return timeMinutes >= startMinutes && timeMinutes < endMinutes;
	}

	static isTimeInRanges = (time: Time, ranges: TimeRange[]): boolean => {
		return ranges.some(range => TimeUtil.isTimeInRange(time, range));
	}

};

export default TimeUtil;