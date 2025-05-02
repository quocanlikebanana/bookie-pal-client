import { configureStore } from '@reduxjs/toolkit';
import { bookingApi } from '@/features/booking/apis/booking.api';
import { profileApi } from '@/features/profile/apis/profile.api';
import profileSlice, { ProfileState } from '@/features/profile/stores/profileSlice';
import bookingSlice from '@/features/booking/stores/booking/bookingSlice';
import storeSlice from '@/features/booking/stores/storeSlice';
import { persistReducer, PersistConfig, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig: PersistConfig<ProfileState> = {
	key: 'profile',
	storage,
	whitelist: ['user', 'token']
};

const persistedProfileReducer = persistReducer(authPersistConfig, profileSlice.reducer);

const store = configureStore({
	reducer: {
		[profileSlice.reducerPath]: persistedProfileReducer,
		[bookingSlice.reducerPath]: bookingSlice.reducer,
		[storeSlice.reducerPath]: storeSlice.reducer,

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