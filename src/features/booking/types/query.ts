import { Time } from "@/app/models/timeUtil";
import { Store as APIStore } from "../apis/booking.api-gen";

export interface Store extends APIStore {
	id: string;
	name: string;
	description: string;
	industry: string;
	address: string;
	image: string;
	phone: string;
	timezone: string;
	today: {
		isOpenToday: boolean;
		openHour: Time;
		closeHour: Time;
	}
	rating: number;
	totalReviews: number;
};

export interface Profile {
	id: string;
	name: string;
	appeance?: string;
};

export interface WorkHour {
	day: {
		name: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
		times: Time[];
	}[];
}