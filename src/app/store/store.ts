import { configureStore } from '@reduxjs/toolkit';
import { bookingApi } from '@/features/booking/apis/booking.api';
import { profileApi } from '@/features/profile/apis/profile.api';
import profileSlice from '@/features/profile/stores/profileSlice';
import bookingSlice from '@/features/booking/stores/booking/bookingSlice';
import storeSlice from '@/features/booking/stores/storeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedProfileReducer = persistReducer({
	key: profileSlice.name,
	storage,
	whitelist: ['user', 'token']
}, profileSlice.reducer);

const persistedBookingReducer = persistReducer({
	key: bookingSlice.name,
	storage,
}, bookingSlice.reducer);

const persistedStoreReducer = persistReducer({
	key: storeSlice.name,
	storage,
}, storeSlice.reducer);

const store = configureStore({
	reducer: {
		[profileSlice.reducerPath]: persistedProfileReducer,
		[bookingSlice.reducerPath]: persistedBookingReducer,
		[storeSlice.reducerPath]: persistedStoreReducer,

		// API reducers
		[bookingApi.reducerPath]: bookingApi.reducer,
		[profileApi.reducerPath]: profileApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
			},
		})
			.concat(profileApi.middleware)
			.concat(bookingApi.middleware)
	,

	devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;