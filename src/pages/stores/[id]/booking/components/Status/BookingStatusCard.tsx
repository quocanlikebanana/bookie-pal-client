import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil } from 'lucide-react';
import { useBookingDataContext } from '../../context/booking-data.context';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { paths } from '@/routers/paths';
import useGetStoreIdFromParams from '@/features/booking/hooks/useGetStoreIdFromParams';

const BookingStatusCard: React.FC = () => {
	const navigate = useNavigate();
	const storeId = useGetStoreIdFromParams();
	const {
		service,
		team,
		startTime,
	} = useBookingDataContext();

	const endTime = startTime ? new Date(startTime.getTime() + (service?.duration || 0) * 60000) : null;

	const handleOnCancel = () => {
		navigate(paths.stores.in(storeId).ROOT);
	}

	return (
		<Card className="w-full max-w-md rounded-lg shadow-md overflow-hidden border-0 bg-gray-100">
			<CardContent className="py-6 px-8">
				<div className="flex justify-between items-start">
					<h2 className="text-lg font-bold ">Your Booking</h2>
					<Button variant={"destructive"} onClick={handleOnCancel} className="text-sm">
						Cancel
					</Button>
				</div>

				<hr className="my-4" />

				{/* Service */}
				{service && (
					<div className="flex justify-between items-center mt-4">
						<div className="flex flex-col">
							<p className="font-medium">{service.name}</p>
							<p className="text-gray-600 text-sm">
								{Math.floor(service.duration / 60)}h {service.duration % 60}m
							</p>
						</div>
						<button className="text-gray-600 hover:">
							<Pencil size={16} />
						</button>
					</div>
				)}

				{/* Team member */}
				{service && team && (
					<div className='flex justify-between items-center mt-4'>
						<div className='flex flex-col'>
							<p className="font-medium">{team.name}</p>
							<p className="text-sm text-gray-600">{team.role}</p>
						</div>
						<button className="text-gray-600 hover:">
							<Pencil size={16} />
						</button>
					</div>
				)}

				{/* Time range */}
				{(service && team && startTime && endTime) && (
					<div className="flex justify-between items-center mt-4">
						<div className="flex items-center">
							<div className='flex flex-col'>
								<span className="text-sm font-semibold">
									{format(startTime, 'hh:mm aa')} - {format(endTime, 'hh:mm aa')}
								</span>
								<span className="text-gray-600 text-sm">
									{format(startTime, 'EEEE, MMMM d, yyyy')}
								</span>
							</div>
						</div>
						<button className="text-gray-600 hover:">
							<Pencil size={16} />
						</button>
					</div>
				)}
			</CardContent>
		</Card >
	);
}

export default BookingStatusCard;