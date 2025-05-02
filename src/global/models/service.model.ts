import { Service } from "@/features/booking/apis/booking.api-gen";

export class ServiceModel {
	private constructor(
		private readonly service: Service,
	) { }

	static create(service: Service) {
		return new ServiceModel(service);
	}

	getService() {
		return this.service;
	}
}

export const EMPTY_SERVICE: Service = {
	id: "",
	storeId: "",
	name: "",
	description: "",
	duration: 0,
	members: [],
	category: "",
}