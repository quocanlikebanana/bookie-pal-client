import { Store } from "@/features/store/types/query";
import { faker } from "@faker-js/faker";
import { industries } from "./industries";

const generateMockStores = (count: number): Store[] => {
	return Array.from({ length: count }, (_) => ({
		id: faker.string.uuid(),
		name: faker.company.name(),
		description: faker.company.catchPhrase(),
		industry: faker.helpers.arrayElement(industries),
		address: faker.location.streetAddress(true),
		image: faker.image.avatar(),
		phone: faker.phone.number({ style: "national" }),
		timezone: faker.location.timeZone(),
		today: {
			isOpenToday: faker.datatype.boolean(),
			openHour: {
				hour: faker.number.int({ min: 8, max: 12 }),
				minute: faker.number.int({ min: 0, max: 59 }),
			},
			closeHour: {
				hour: faker.number.int({ min: 13, max: 22 }),
				minute: faker.number.int({ min: 0, max: 59 }),
			},
		},
		rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
		totalReviews: faker.number.int({ min: 0, max: 1000 }),
	}));
};

export const generateMockRating = () => {
	return faker.number.float({ min: 1, max: 5, fractionDigits: 1 });
}

export const generateMockTotalReviews = () => {
	return faker.number.int({ min: 0, max: 1000 });
}


export default generateMockStores;

