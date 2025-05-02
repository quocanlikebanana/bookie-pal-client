import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateCustomer, PostStoresByStoreIdBookApiArg, Service, Store, Team } from '../../apis/booking.api-gen';

type BookingCustomer = Omit<CreateCustomer, "storeId">;

interface BookingState {
	store: Store | null;
	service: Service | null;
	team: Team | null;
	startTime: string;
	customer: BookingCustomer;
	comment: string;
}

const initialState: BookingState = {
	store: null,
	service: null,
	team: null,
	startTime: new Date().toString(),
	customer: {
		email: '',
		name: '',
		phone: '',
		address: '',
		avatar: '',
	},
	comment: '',
};

const bookingSlice = createSlice({
	name: 'booking',
	initialState,
	reducers: {
		setStore: (state, action: PayloadAction<Store>) => {
			state.store = action.payload;
		},
		setService: (state, action: PayloadAction<Service>) => {
			state.service = action.payload;
			state.team = null; // Reset selected team when service changes
		},
		setTeam: (state, action: PayloadAction<Team>) => {
			state.team = action.payload;
		},
		setStartTime: (state, action: PayloadAction<Date>) => {
			state.startTime = action.payload.toString();
		},
		setCustomer: (state, action: PayloadAction<BookingCustomer>) => {
			state.customer = action.payload;
		},
		setComment: (state, action: PayloadAction<string>) => {
			state.comment = action.payload;
		},
		clearBookingData: () => {
			return initialState; // Reset to initial state
		},
	},
	selectors: {
		selectStore: (state) => state.store,
		selectService: (state) => state.service,
		selectTeam: (state) => state.team,
		selectStartTime: (state) => new Date(state.startTime),
		selectEndTime: (state) => {
			const startTime = new Date(state.startTime);
			if (state.service) {
				const endTime = new Date(startTime.getTime() + state.service.duration * 60000); // duration is in minutes
				return endTime;
			}
			return startTime;
		},
		selectCustomer: (state) => state.customer,
		selectComment: (state) => state.comment,
		selectBookingData: (state): PostStoresByStoreIdBookApiArg | null => {
			if (!state.store || !state.service || !state.team) return null;
			const startTime = new Date(state.startTime);
			const endTime = new Date(startTime.getTime() + state.service.duration * 60000);
			return {
				storeId: state.store.id || "",
				body: {
					serviceId: state.service.id || "",
					teamId: state.team?.id || "",
					start: startTime.toISOString(),
					end: endTime.toISOString(),
					customer: {
						...state.customer,
						storeId: state.store.id,
					},
					comment: state.comment,
				}
			};
		}
	},
});

export default bookingSlice;