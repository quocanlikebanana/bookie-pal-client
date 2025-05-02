import { TimeRange, WorkHoursOfDays } from "@/features/booking/apis/booking.api-gen";
import { faker } from "@faker-js/faker";

const generateMockAvailability = (): WorkHoursOfDays => {
	return faker.helpers.arrayElements(
		[0, 1, 2, 3, 4, 5, 6],
		faker.number.int({ min: 4, max: 6 })
	).map((day) => {
		return {
			dayOfWeek: day,
			workHours: faker.helpers.arrayElements<TimeRange>([
				{
					start: {
						hour: faker.number.int({ min: 0, max: 23 }),
						minute: faker.number.int({ min: 0, max: 59 })
					},
					end: {
						hour: faker.number.int({ min: 0, max: 23 }),
						minute: faker.number.int({ min: 0, max: 59 })
					}
				},
			],
				faker.number.int({ min: 0, max: 3 })
			)
		};
	}).filter((day) => {
		const hasNoOverlap = (timeRanges: TimeRange[]): boolean => {
			for (let i = 0; i < timeRanges.length; i++) {
				for (let j = i + 1; j < timeRanges.length; j++) {
					const range1 = timeRanges[i];
					const range2 = timeRanges[j];
					if (
						(range1.start.hour < range2.end.hour ||
							(range1.start.hour === range2.end.hour && range1.start.minute < range2.end.minute)) &&
						(range2.start.hour < range1.end.hour ||
							(range2.start.hour === range1.end.hour && range2.start.minute < range1.end.minute))
					) {
						return false;
					}
				}
			}
			return true;
		};
		return day.workHours.length > 0 && hasNoOverlap(day.workHours);
	});
}

export default generateMockAvailability;