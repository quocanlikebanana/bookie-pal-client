import { useState } from 'react';
import { ChevronUp, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define types for our component
type TimeRange = {
	start: string;
	end: string;
};

type DaySchedule = {
	day: string;
	isOpen: boolean;
	timeRanges: TimeRange[];
};

// Sample business hours data with multiple time ranges
const defaultBusinessHours: DaySchedule[] = [
	{
		day: 'Sunday',
		isOpen: false,
		timeRanges: []
	},
	{
		day: 'Monday',
		isOpen: true,
		timeRanges: [
			{ start: '8:00 AM', end: '12:00 PM' },
			{ start: '1:30 PM', end: '6:30 PM' }
		]
	},
	{
		day: 'Tuesday',
		isOpen: true,
		timeRanges: [
			{ start: '8:00 AM', end: '5:00 PM' }
		]
	},
	{
		day: 'Wednesday',
		isOpen: true,
		timeRanges: [
			{ start: '8:00 AM', end: '12:00 PM' },
			{ start: '1:00 PM', end: '6:00 PM' }
		]
	},
	{
		day: 'Thursday',
		isOpen: true,
		timeRanges: [
			{ start: '8:00 AM', end: '5:00 PM' }
		]
	},
	{
		day: 'Friday',
		isOpen: true,
		timeRanges: [
			{ start: '8:00 AM', end: '5:00 PM' }
		]
	},
	{
		day: 'Saturday',
		isOpen: false,
		timeRanges: []
	}
];

const BusinessHours = () => {
	const [expanded, setExpanded] = useState(false);
	const [businessHours, setBusinessHours] = useState<DaySchedule[]>(defaultBusinessHours);

	// Determine if the business is currently open
	const getCurrentStatus = (): { isOpen: boolean; message: string } => {
		// Mock implementation - in production, you'd compare with actual time
		return { isOpen: false, message: "Closed now" };
	};

	const status = getCurrentStatus();

	// Format time ranges for display
	const formatTimeRanges = (timeRanges: TimeRange[]): string => {
		if (timeRanges.length === 0) return "Closed";

		return timeRanges.map(range => `${range.start} - ${range.end}`).join(', ');
	};

	// Get today's day name for highlighting
	const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

	// Getting the current time to display at the top (would be dynamic in production)
	const currentTimeDisplay = (): string => {
		const todaySchedule = businessHours.find(schedule => schedule.day === today);
		if (!todaySchedule || !todaySchedule.isOpen) return "Closed today";

		return formatTimeRanges(todaySchedule.timeRanges);
	};

	return (
		<>
			{/* Current status section */}
			<div className="p-4 border-b">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-gray-500" />
						<span className="font-medium">{status.isOpen ? "Open now" : "Closed now"}</span>
						<Button
							variant="ghost"
							size="sm"
							className="p-0 h-6"
							onClick={() => setExpanded(!expanded)}
						>
							{expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
						</Button>
					</div>
					<div className="text-gray-600">{currentTimeDisplay()}</div>
				</div>
			</div>

			{/* Expanded hours section */}
			{expanded && (
				<div className="p-0">
					{businessHours.map((schedule) => (
						<div
							key={schedule.day}
							className={`flex items-center justify-between p-3 border-b last:border-b-0 ${schedule.day === today ? 'bg-gray-50' : ''}`}
						>
							<div className="font-medium">
								{schedule.day}
								{schedule.day === today && <span className="ml-2 text-sm text-blue-600">(Today)</span>}
							</div>
							<div className="text-right">
								{schedule.isOpen ? (
									<div>
										{schedule.timeRanges.map((range, index) => (
											<div key={index} className="text-gray-600">
												{range.start} - {range.end}
											</div>
										))}
									</div>
								) : (
									<span className="text-gray-500">Closed</span>
								)}
							</div>
						</div>
					))}
					<div className="p-2 text-right text-xs text-gray-500">
						Time zone (Indochina Time)
					</div>
				</div>
			)}
		</>
	);
};

export default BusinessHours;