import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_STORE } from '@/app/models/storeUtil';
import { Pagination, Service, Store } from '../apis/booking.api-gen';

interface StoreState {
	currentData: {
		store: Store;
		services: Service[];
		pagedServices: Pagination;
	} | null;
}

const initialState: StoreState = {
	currentData: null,
};

const storeSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		setCurrentStore: (state, action: PayloadAction<StoreState["currentData"]>) => {
			state.currentData = action.payload;
		},
		clearCurrentStore: (state) => {
			state.currentData = null;
		},
	},
	selectors: {
		selectStore: (state: StoreState): Store => state.currentData?.store || EMPTY_STORE,
		selectServices: (state: StoreState): Service[] => state.currentData?.services || [],
	},
});

export default storeSlice;