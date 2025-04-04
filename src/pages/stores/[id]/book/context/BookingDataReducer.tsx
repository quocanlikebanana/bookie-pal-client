import { CreateBookingData } from "@/features/store/types/command";

export type BookingDataAction =
	| {
		type: "SET_SERVICE_ID";
		payload: string | null;
	} | {
		type: "SET_TEAM_ID";
		payload: string | null;
	} | {
		type: "SET_TIME_RANGE";
		payload: {
			startTime: Date;
			serviceDuration: number;
		} | null;
	} | {
		type: "SET_CUSTOMER";
		payload: CreateBookingData["customer"] | null;
	} | {
		type: "SET_COMMENT";
		payload: string | null;
	} | {
		type: "RESET"
	};

const bookingDataReducer = (state: CreateBookingData, action: BookingDataAction): CreateBookingData => {
	switch (action.type) {
		case "SET_SERVICE_ID":
			return { ...state, serviceId: action.payload };
		case "SET_TEAM_ID":
			return { ...state, teamId: action.payload };
		case "SET_TIME_RANGE":
			if (!action.payload) {
				return { ...state, startTime: null, endTime: null };
			}
			return {
				...state,
				startTime: action.payload.startTime,
				endTime: new Date(action.payload.startTime.getTime() + action.payload.serviceDuration * 60 * 1000),
			};
		case "SET_COMMENT":
			return { ...state, comment: action.payload };
		case "SET_CUSTOMER":
			return { ...state, customer: action.payload };
		case "RESET":
			return {
				serviceId: null,
				teamId: null,
				startTime: null,
				endTime: null,
				comment: null,
				customer: null,
			};
		default:
			return state;
	}
};

export default bookingDataReducer;
