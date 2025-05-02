import { createSelector } from "@reduxjs/toolkit";
import bookingSlice from "./bookingSlice";

const selectBookingState = createSelector(
	bookingSlice.selectors.selectStore,
	bookingSlice.selectors.selectService,
	bookingSlice.selectors.selectTeam,
	bookingSlice.selectors.selectStartTime,
	bookingSlice.selectors.selectEndTime,
	bookingSlice.selectors.selectCustomer,
	bookingSlice.selectors.selectComment,
	(store, selectedService, selectedTeam, startTime, endTime, customer, comment) => {
		return {
			store,
			service: selectedService,
			team: selectedTeam,
			startTime,
			endTime,
			customer,
			comment,
		};
	}
)

export default {
	selectBookingState,
}