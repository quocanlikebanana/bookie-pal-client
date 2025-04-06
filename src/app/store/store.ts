import { configureStore } from '@reduxjs/toolkit';
import { storeApi } from '@/features/store/apis/store.api';
import authSliceReducer from '@/features/auth/stores/authSlice';

const store = configureStore({
	reducer: {
		auth: authSliceReducer,
		[storeApi.reducerPath]: storeApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(storeApi.middleware)
	,

	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;