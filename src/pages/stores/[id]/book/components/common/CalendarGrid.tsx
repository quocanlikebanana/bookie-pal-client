import { Button } from "@/components/ui/button";
import TimeUtil from "@/global/models/time";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const monthNames = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function CalendarGrid({
	selectedDate,
	setSelectedDate,
	currentMonthDate,
	setCurrentMonthDate,
}: {
	selectedDate: number;
	setSelectedDate: (date: number) => void;
	currentMonthDate: Date;
	setCurrentMonthDate: (date: Date) => void;
}) {
	const handlePrevMonth = () => {
		setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() - 1, 1));
	};

	const handleNextMonth = () => {
		setCurrentMonthDate(new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1));
	};

	const days = TimeUtil.generateCalendarDays(currentMonthDate);

	return (
		<div>
			{/* Month's name */}
			<div className="flex items-center justify-between mb-2">
				<div className="text-sm">
					{monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}
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
						<Button
							disabled={day.isCurrentMonth == false}
							variant={day.date === selectedDate && day.isCurrentMonth
								? "default"
								: "ghost"
							}
							className={`w-8 h-8 p-0 rounded-full ${day.isCurrentMonth == false
								? 'text-gray-400'
								: ''
								} ${day.isToday
									? 'font-bold'
									: ''}`}
							onClick={() => { setSelectedDate(day.date) }}
						>
							{day.date}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
