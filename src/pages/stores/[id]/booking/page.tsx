import { BookingTabProvider } from './context/booking-tab.context'
import StoreBookMain from './components/StoreBookMain'
import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import bookingSlice from '@/features/booking/stores/booking/bookingSlice';
import storeSlice from '@/features/booking/stores/storeSlice';
import { useEffect } from 'react';
import profileSlice from '@/features/profile/stores/profileSlice';

export default function StoreBookPage() {
	const dispatch = useAppDispatch();
	const store = useAppSelector(storeSlice.selectors.selectStore);
	const isAuthenticated = useAppSelector(profileSlice.selectors.selectIsAuthenticated);
	const user = useAppSelector(profileSlice.selectors.selectUser);
	useEffect(() => {
		dispatch(bookingSlice.actions.initialize({
			store,
			user: isAuthenticated ? user || null : null,
		}));
	}, [store, dispatch]);

	return (
		<BookingTabProvider>
			<StoreBookMain />
		</BookingTabProvider>
	)
}