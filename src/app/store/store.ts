import { configureStore } from '@reduxjs/toolkit';
import { industryApi } from '../../features/store/apis/industry.api';
import { storeApi } from '@/features/store/apis/store.api';

const store = configureStore({
	reducer: {
		[industryApi.reducerPath]: industryApi.reducer,
		[storeApi.reducerPath]: storeApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(industryApi.middleware)
			.concat(storeApi.middleware)
	,

	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;