import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TimeUtil, { Time } from '@/global/models/time';
import { useGetStoresByStoreIdTeamsAndTeamIdAvailabilityQuery } from '@/features/store/apis/store.api-gen';
import CalendarGrid from '../common/CalendarGrid';
import useGetStoreIdFromParams from '@/features/store/hooks/useGetStoreIdFromParams';
import useGetTeamIdFromParams from '@/features/store/hooks/useGetTeamIdFromParams';
import { useBookingTabContext } from '../../context/BookingTabContext';
import { useBookingDataContext } from '../../context/BookingDataContext';
import { useBookingServiceInfoContext } from '../../context/BookingServiceInfoContext';

const BookingTime: React.FC = () => {
	const storeId = useGetStoreIdFromParams();
	const teamId = useGetTeamIdFromParams();
	const { setCurrentTab } = useBookingTabContext();
	const { dispatch } = useBookingDataContext();
	const { selectedService } = useBookingServiceInfoContext()

	const now = new Date();
	const [selectedDate, setSelectedDate] = useState<number>(now.getDate());
	const [currentMonthDate, setCurrentMonthDate] = useState<Date>(now);

	const currentDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), selectedDate, 0, 0, 0, 0);

	const { data: workHoursInWeek } = useGetStoresByStoreIdTeamsAndTeamIdAvailabilityQuery({
		storeId,
		teamId,
		start: currentDate.toISOString(),
		end: currentDate.toISOString(),
	});

	if (!workHoursInWeek) return null;
	if (selectedService === null) return null;

	const workHours = workHoursInWeek[0].workHours;
	const times = TimeUtil.generateTimeSlots(workHours);

	const handleTimeSlotClick = (time: Time) => {
		const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), time.hour, time.minute, 0, 0);
		dispatch({
			type: "SET_TIME_RANGE",
			payload: {
				startTime,
				serviceDuration: selectedService.duration,
			},
		});
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
		<div className="flex flex-col bg-zinc-950 text-white p-4 max-w-4xl mx-auto">
			<div className="mb-4">
				<h2 className="text-xl font-bold">15 Minutes Meeting</h2>
			</div>

			<div className="flex flex-col md:flex-row gap-4">

				{/* Calendar Section */}
				<div className="md:w-1/3">

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
							<SelectTrigger className="w-full text-sm bg-transparent border-gray-700">
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
				<div className="md:w-2/3">
					<div className="text-center mb-4">
						<h3 className="text-sm font-medium">{currentDate.toDateString()}</h3>
					</div>

					<div className="grid grid-cols-2 gap-2">
						{times.map((time) => (
							<Button
								variant="outline"
								className="w-full h-12 text-center justify-center font-normal hover:bg-gray-100 dark:hover:bg-gray-800"
								onClick={() => handleTimeSlotClick(time)}
							>
								<span className="text-sm">{TimeUtil.toString12HourFormat(time)}</span>
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingTime;

