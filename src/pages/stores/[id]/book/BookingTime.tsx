import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TimeSlotProps {
	time: string;
	period: 'AM' | 'PM';
	onClick?: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, period, onClick }) => {
	return (
		<Button
			variant="outline"
			className="w-full h-12 text-center justify-center font-normal hover:bg-gray-100 dark:hover:bg-gray-800"
			onClick={onClick}
		>
			<span className="text-sm">{time} <span className="text-xs">{period}</span></span>
		</Button>
	);
};

interface CalendarDateProps {
	date: number;
	isCurrentMonth: boolean;
	isToday: boolean;
	isSelected: boolean;
	onClick: () => void;
}

const CalendarDate: React.FC<CalendarDateProps> = ({
	date,
	isCurrentMonth,
	isToday,
	isSelected,
	onClick
}) => {
	return (
		<Button
			variant={isSelected ? "default" : "ghost"}
			className={`w-8 h-8 p-0 rounded-full ${!isCurrentMonth ? 'text-gray-400' : ''
				} ${isToday ? 'font-bold' : ''}`}
			onClick={onClick}
		>
			{date}
		</Button>
	);
};

const BookingTime: React.FC = () => {
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 3, 1)); // April 2025
	const [selectedDate, setSelectedDate] = useState<number>(3); // April 3rd selected

	// Generate days for the calendar
	const generateCalendarDays = () => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();

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
				isToday:
					today.getDate() === i &&
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
	};

	const days = generateCalendarDays();

	// Generate time slots
	const generateTimeSlots = () => {
		const timeSlots = [];

		// AM slots
		for (let hour = 9; hour <= 11; hour++) {
			timeSlots.push({ time: `${hour}:00`, period: 'AM' as const });
			timeSlots.push({ time: `${hour}:30`, period: 'AM' as const });
		}

		// PM slots
		for (let hour = 12; hour <= 4; hour++) {
			timeSlots.push({ time: `${hour}:00`, period: 'PM' as const });
			timeSlots.push({ time: `${hour}:30`, period: 'PM' as const });
		}

		// Add 15-minute intervals
		const fullTimeSlots: ({ time: string; period: "AM"; } | { time: string; period: "PM"; })[] = [];
		timeSlots.forEach(slot => {
			const hour = parseInt(slot.time.split(':')[0]);
			fullTimeSlots.push(slot);
			fullTimeSlots.push({
				time: `${hour}:15`,
				period: slot.period
			});
			fullTimeSlots.push({
				time: `${hour}:45`,
				period: slot.period
			});
		});

		return fullTimeSlots.sort((a, b) => {
			const aHour = parseInt(a.time.split(':')[0]);
			const bHour = parseInt(b.time.split(':')[0]);
			const aMinute = parseInt(a.time.split(':')[1]);
			const bMinute = parseInt(b.time.split(':')[1]);

			if (a.period === b.period) {
				if (aHour === bHour) {
					return aMinute - bMinute;
				}
				return aHour - bHour;
			}
			return a.period === 'AM' ? -1 : 1;
		});
	};

	const timeSlots = generateTimeSlots();

	const handlePrevMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
	};

	const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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
					<div className="flex items-center justify-between mb-2">
						<div className="text-sm">
							{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
						</div>
						<div className="flex gap-1">
							<Button size="icon" variant="ghost" onClick={handlePrevMonth} className="h-6 w-6 p-0">
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button size="icon" variant="ghost" onClick={handleNextMonth} className="h-6 w-6 p-0">
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>

					{/* Day headers */}
					<div className="grid grid-cols-7 gap-1 mb-1">
						{dayNames.map((day, index) => (
							<div key={index} className="text-center text-xs text-gray-400">
								{day}
							</div>
						))}
					</div>

					{/* Calendar grid */}
					<div className="grid grid-cols-7 gap-1">
						{days.map((day, index) => (
							<div key={index} className="text-center">
								<CalendarDate
									date={day.date}
									isCurrentMonth={day.isCurrentMonth}
									isToday={day.isToday}
									isSelected={day.isCurrentMonth && day.date === selectedDate}
									onClick={() => day.isCurrentMonth && setSelectedDate(day.date)}
								/>
							</div>
						))}
					</div>

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
						<h3 className="text-sm font-medium">Thursday {selectedDate} April</h3>
					</div>

					<div className="grid grid-cols-2 gap-2">
						{timeSlots.map((slot, index) => (
							<TimeSlot
								key={index}
								time={slot.time}
								period={slot.period}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingTime;