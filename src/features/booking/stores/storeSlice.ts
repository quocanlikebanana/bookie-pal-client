import { createSlice } from '@reduxjs/toolkit';
import { EMPTY_STORE } from '@/global/models/storeUtil';
import { Store } from '../apis/booking.api-gen';

// Define the type for the state
interface StoreState {
	currentStore: Store | null;
}

// Initial state
const initialState: StoreState = {
	currentStore: EMPTY_STORE,
};

// Create the slice
const storeSlice = createSlice({
	name: 'store',
	initialState,
	reducers: {
		setCurrentStore: (state, action) => {
			state.currentStore = action.payload;
		},
		clearCurrentStore: (state) => {
			state.currentStore = null;
		},
	},
	selectors: {
		getCurrentStore: (state: StoreState): Store => state.currentStore || EMPTY_STORE,
	},
});


export default storeSlice;