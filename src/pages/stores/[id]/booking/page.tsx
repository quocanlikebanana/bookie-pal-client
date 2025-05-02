import { BookingTabProvider } from './context/booking-tab.context'
import StoreBookMain from './components/StoreBookMain'

export default function StoreBookPage() {
	return (
		<BookingTabProvider>
			<StoreBookMain />
		</BookingTabProvider>
	)
}