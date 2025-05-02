import { createSelector } from "@reduxjs/toolkit";
import bookingSlice from "./bookingSlice";
import { bookingGenApi, Team } from "../../apis/booking.api-gen";
import { RootState } from "@/app/store/store";

const selectCurrentTeamsOfService = createSelector(
	(state: RootState) => state,
	bookingSlice.selectors.selectService,
	(state, selectedService): Team[] => {
		if (selectedService == null) return [];
		const teams = bookingGenApi.endpoints.getServicesByServiceIdTeams.select({
			serviceId: selectedService.id,
			page: 1,
			limit: 100,
		})(state);
		return teams.data?.teams || [];
	}
);

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
	selectCurrentTeamsOfService,
	selectBookingState,
	...bookingSlice.selectors,
}