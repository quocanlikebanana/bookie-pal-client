import { BookingDataProvider } from './context/BookingDataContext'
import { BookingServiceInfoProvider } from './context/BookingServiceInfoContext'
import { BookingTabProvider } from './context/BookingTabContext'
import StoreBookMain from './StoreBookMain'

export default function StoreBookPage() {
	return (
		<BookingTabProvider>
			<BookingDataProvider>
				<BookingServiceInfoProvider>
					<StoreBookMain />
				</BookingServiceInfoProvider>
			</BookingDataProvider>
		</BookingTabProvider>
	)
}