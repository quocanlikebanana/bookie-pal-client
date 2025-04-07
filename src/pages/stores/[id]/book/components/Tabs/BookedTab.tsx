import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Network } from 'lucide-react';

interface BookingConfirmationProps {
	bookingId?: string;
	date?: string;
	startTime?: string;
	endTime?: string;
	timezone?: string;
	serviceName?: string;
	serviceDuration?: string;
	hostName?: string;
	price?: string;
	onBookAnother?: () => void;
}

const BookedTab: React.FC<BookingConfirmationProps> = ({
	bookingId = "EWJC9CET",
	date = "Friday 4 April 2025",
	startTime = "2:45 PM",
	endTime = "3:00 PM",
	timezone = "Asia/Bangkok",
	serviceName = "15 Minutes Meeting",
	serviceDuration = "15 mins",
	hostName = "An Ngo",
	price = "Free",
	onBookAnother = () => { },
}) => {
	const [email, setEmail] = React.useState("");

	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex flex-col items-center max-w-lg mx-auto px-4 py-12 w-full">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Booking confirmed</h1>
					<p className="text-gray-600">with Ango</p>
				</div>

				<div className="w-full space-y-6">
					<div className="flex justify-between items-start">
						<div className="text-gray-600">Date & time</div>
						<div className="text-right">
							<div className="font-medium">{date} · {startTime} – {endTime}</div>
							<div className="text-gray-600 text-sm">Time zone ({timezone})</div>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="text-gray-600">Booking ID</div>
						<div className="flex items-center">
							<span className="font-medium mr-2">{bookingId}</span>
							<button className="text-gray-600 hover:text-gray-700">
								<Copy size={16} />
							</button>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="text-gray-600">Service</div>
						<div className="flex items-center">
							<div className="bg-white w-10 h-10 rounded flex items-center justify-center mr-3">
								<Network className="text-black" />
							</div>
							<div>
								<div className="font-medium">{serviceName}</div>
								<div className="text-gray-600 text-sm">{serviceDuration} · with {hostName}</div>
							</div>
							<div className="ml-6 font-medium">{price}</div>
						</div>
					</div>
				</div>

				<div className="mt-10 text-center text-gray-600 text-sm">
					A confirmation has been emailed to you
				</div>

				<Button
					variant="outline"
					className="mt-6 rounded-full border-gray-300 hover:bg-gray-200"
					onClick={onBookAnother}
				>
					Book another appointment
				</Button>
			</div>

			<div className="border-t border-gray-200 py-10 px-4">
				<div className="max-w-lg mx-auto">
					<h2 className="text-xl font-bold mb-2">Want your own Booking Page?</h2>
					<p className="text-gray-400 mb-6">Automate bookings, payments and reminders to save countless hours.</p>

					<div className="flex flex-col sm:flex-row gap-3">
						<Input
							type="email"
							placeholder="nqakg2611@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="flex-1 border-gray-300 text-white"
						/>
						<Button className="hover:bg-gray-700 rounded-full font-medium">
							Get your Booking Page
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookedTab;