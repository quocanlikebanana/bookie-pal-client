import { createSlice } from '@reduxjs/toolkit';

// Define the type for the booking state
interface BookingState {
}

// Define the initial state
const initialState: BookingState = {
};

// Create the booking slice
const bookingSlice = createSlice({
	name: 'booking',
	initialState,
	reducers: {

	},
});

export default bookingSlice;