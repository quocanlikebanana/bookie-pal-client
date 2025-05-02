import { BookingDataProvider } from './context/booking-data.context'
import { BookingTabProvider } from './context/booking-tab.context'
import StoreBookMain from './components/StoreBookMain'

export default function StoreBookPage() {
	return (
		<BookingTabProvider>
			<BookingDataProvider>
				<StoreBookMain />
			</BookingDataProvider>
		</BookingTabProvider>
	)
}