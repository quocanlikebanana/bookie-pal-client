import { BookingDataProvider } from './context/BookingDataContext'
import { BookingTabProvider } from './context/BookingTabContext'
import StoreBookMain from './StoreBookMain'

export default function StoreBookPage() {
	return (
		<BookingTabProvider>
			<BookingDataProvider>
				<StoreBookMain />
			</BookingDataProvider>
		</BookingTabProvider>
	)
}