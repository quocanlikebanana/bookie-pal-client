import TimeUtil from '@/global/models/time'
import { ChevronRight } from 'lucide-react'
import { useBookingDataContext } from '../../context/BookingDataContext'
import { useBookingTabContext } from '../../context/BookingTabContext'
import { Service } from '@/features/store/apis/store.api-gen'

export default function ServiceItem({
	service
}: {
	service: Service
}) {
	const { dispatch } = useBookingDataContext();
	const { setCurrentTab } = useBookingTabContext();

	return (
		<div
			key={service.id}
			className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg mb-3 cursor-pointer hover:bg-gray-200"
			onClick={() => {
				dispatch({
					type: "SET_SERVICE_ID",
					payload: service.id,
				});
				setCurrentTab("pickTime");
			}}
		>
			<div className="flex items-center">
				<div className="rounded-md w-12 h-12 flex items-center justify-center mr-4">
					<span className="text-lg">{service.name.charAt(0)}</span>
				</div>
				<div className='flex flex-col'>
					<h3 className="font-medium">{service.name}</h3>
					<span className="text-gray-600 text-sm">
						{TimeUtil.formatMinute(service.duration)}
					</span>
				</div>
			</div>
			<ChevronRight className="text-gray-600" size={20} />
		</div>
	)
}
