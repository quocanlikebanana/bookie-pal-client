import { Time } from "@/global/models/time";

export interface Store {
	id: number;
	name: string;
	description?: string;
	industry: string;
	address?: string;
	image: string;
	phone: string;
	timezone: string;
	today: {
		openHour: Time;
		closeHour: Time;
	}
}