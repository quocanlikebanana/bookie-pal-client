export interface CreateBookingData {
	serviceId: string;
	teamId: string;
	startTime: Date;
	endTime: Date;
	comment: string;
	customer: {
		type: "customer";
		customerId: string;
	} | {
		type: "guest";
		email: string;
		name: string;
		phone: string;
	};
}
