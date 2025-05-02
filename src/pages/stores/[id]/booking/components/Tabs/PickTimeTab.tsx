import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TimeUtil, { Time } from '@/global/models/timeUtil';
import CalendarGrid from '../../../../../../components/common/CalendarGrid';
import { useBookingTabContext } from '../../context/booking-tab.context';
import { useGetTeamsByTeamIdAvailabilityQuery } from '@/features/booking/apis/booking.api-gen';
import { format } from 'date-fns';
import bookingSlice from '@/features/booking/stores/booking/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';

const PickTimeTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const team = useAppSelector(bookingSlice.selectors.selectTeam);
	const service = useAppSelector(bookingSlice.selectors.selectService);

	const { setCurrentTab } = useBookingTabContext();

	const now = new Date();
	const [selectedDate, setSelectedDate] = useState<number>(now.getDate());
	const [currentMonthDate, setCurrentMonthDate] = useState<Date>(now);

	const currentDateStart = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), selectedDate, 0, 0, 0, 0);
	const currentDateEnd = new Date(currentDateStart.getTime() + 24 * 60 * 60 * 1000);

	const { data: workHoursInWeek } = useGetTeamsByTeamIdAvailabilityQuery({
		teamId: team?.id || "",
		start: currentDateStart.toISOString(),
		end: currentDateEnd.toISOString(),
	}, {
		skip: team == null,
	});

	if (!workHoursInWeek || !team || !service) return null;

	const workHours = workHoursInWeek[0];
	const times = TimeUtil.generateTimeSlots(workHours);

	const handleTimeSlotClick = (time: Time) => {
		const startTime = new Date(currentDateStart.getFullYear(), currentDateStart.getMonth(), currentDateStart.getDate(), time.hour, time.minute, 0, 0);
		dispatch(bookingSlice.actions.setStartTime(startTime));
		setCurrentTab("fillForm");
	}

	// TODO: implement time zone
	const timeZones = [
		'Thailand - Bangkok',
		'Singapore - Singapore',
		'Japan - Tokyo',
		'USA - Pacific Time',
		'USA - Eastern Time',
		'UK - London'
	];

	return (
		<div className="flex flex-col p-4 max-w-4xl mx-auto">
			<div className="mb-4">
				<h2 className="text-xl font-bold">{service?.name}</h2>
			</div>

			<hr className="mb-4" />

			<div className="flex flex-col md:flex-row gap-4">

				<div className="md:w-fit">

					{/* Calendar Section */}
					<CalendarGrid
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						currentMonthDate={currentMonthDate}
						setCurrentMonthDate={setCurrentMonthDate}
					/>

					{/* Time zone selector */}
					<div className="mt-4">
						<div className="text-xs mb-1">Time zone</div>
						<Select defaultValue={timeZones[0]}>
							<SelectTrigger className="w-full text-sm bg-transparent border-gray-300">
								<SelectValue placeholder="Select time zone" />
							</SelectTrigger>
							<SelectContent>
								{timeZones.map((zone, index) => (
									<SelectItem key={index} value={zone}>{zone}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Time slots section */}
				<div className="ml-auto md:w-1/2">
					<div className="text-center mb-4">
						<h3 className="text-sm font-medium">
							{format(currentDateStart, 'EEEE, MMMM d, yyyy')}
						</h3>
					</div>

					{times.length == 0 ? (
						<div className="text-center text-sm text-gray-700 mb-2">
							Not availible for booking
						</div>
					) : (
						<div className="grid grid-cols-2 gap-2">
							{times.map((time) => (
								<Button
									variant="outline"
									className="w-full min-h-fit text-center justify-center font-normal hover:bg-gray-100"
									onClick={() => handleTimeSlotClick(time)}
								>
									<span className="text-sm">{TimeUtil.toString12HourFormat(time)}</span>
								</Button>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default PickTimeTab;

