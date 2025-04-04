export interface CreateBookingData {
	serviceId: string | null;
	teamId: string | null;
	startTime: Date | null;
	endTime: Date | null;
	comment: string | null;
	customer: {
		type: "customer";
		customerId: string;
	} | {
		type: "guest";
		email: string;
		name: string;
		phone: string;
	} | null;
}
