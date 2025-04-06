import { Store } from "@/features/store/apis/store.api-gen";
import TimeUtil from "./timeUtil";

export class StoreUtil {
	static isOpenTodayDisplay(store: Store): {
		isOpen: boolean;
		timeRangesDisplay: string;
	} {
		const now = new Date();
		const currentWeekDay = (now.getDay() + 8) % 7;
		const toDayWorkHours = store.workHours.find((workHour) => workHour.dayOfWeek === currentWeekDay);
		if (!toDayWorkHours) return {
			isOpen: false,
			timeRangesDisplay: "",
		};
		const currentTime = {
			hour: now.getHours(),
			minute: now.getMinutes(),
		};
		const isOpen = TimeUtil.isTimeInRanges(currentTime, toDayWorkHours.workHours);
		const timeRangesDisplay = TimeUtil.formatTimeRanges(toDayWorkHours.workHours);
		return {
			isOpen,
			timeRangesDisplay,
		}
	};

}