import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Network } from 'lucide-react';
import { useBookingDataContext } from '../../context/booking-data.context';
import { faker } from '@faker-js/faker';
import { useBookingTabContext } from '../../context/booking-tab.context';
import useGetStore from '@/features/booking/hooks/useGetStore';

const BookedTab: React.FC = () => {
	const [email, setEmail] = React.useState("");
	const { storeQuery: { data: store } } = useGetStore();
	const {
		service,
		team,
		startTime,
		getEndTime,
		customer,
		comment,
		clearBookingData,
	} = useBookingDataContext();
	const { setCurrentTab } = useBookingTabContext();

	const endTime = getEndTime();

	if (!service || !team || !startTime || !endTime || !customer || store) return null;

	const dateString = startTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
	const startTimeString = startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }).replace(/\s/g, '').toLowerCase();
	const endTimeString = endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }).replace(/\s/g, '').toLowerCase();

	const minuteDurationFormat = (duration: number) => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return `${hours > 0 ? `${hours}h` : ''} ${minutes}m`.trim();
	}

	const onBookAnother = () => {
		clearBookingData();
		setCurrentTab("chooseService");
	};

	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex flex-col items-center max-w-lg mx-auto px-4 py-12 w-full">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Booking confirmed</h1>
					<p className="text-gray-600">with {store.name}</p>
				</div>

				<div className="w-full space-y-6">
					<div className="flex justify-between items-start">
						<div className="text-gray-600">Date & time</div>
						<div className="text-right">
							<div className="font-medium">{dateString} · {startTimeString} – {endTimeString}</div>
							<div className="text-gray-600 text-sm">Time zone ({store.timezone})</div>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="text-gray-600">Booking ID</div>
						<div className="flex items-center">
							<span className="font-medium mr-2">{faker.string.nanoid()}</span>
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
								<div className="font-medium">{service.name}</div>
								<div className="text-gray-600 text-sm">{minuteDurationFormat(service.duration)} · with {team.name}</div>
							</div>
							<div className="ml-3 text-gray-600">
								{comment && <span className="text-sm">{comment}</span>}
							</div>
						</div>
					</div>

					<hr className="border-t border-gray-200" />

					<div className="flex justify-between items-start">
						<div className="text-gray-600 min-w-fit">Your information</div>
						<div className="flex flex-col items-end">
							<div className="text-gray-600 text-sm">
								{customer.name}
							</div>
							<span className="text-gray-600 text-sm">
								Email: {customer.email}
							</span>
							<span className="text-gray-600 text-sm">
								Phone: {customer.phone}
							</span>
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
							placeholder="Enter your email"
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