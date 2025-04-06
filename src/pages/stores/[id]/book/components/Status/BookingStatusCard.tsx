import { useBookingDataContext } from "../../context/BookingDataContext"

export default function BookingStatusCard() {
	const { bookingData } = useBookingDataContext();
	return (
		<div>
			{JSON.stringify(bookingData)}
		</div>
	)
}
