import { Store } from "@/features/store/types/query";
import { faker } from "@faker-js/faker";
import { industries } from "./industries";

const generateMockStores = (count: number): Store[] => {
	return Array.from({ length: count }, (_, index) => ({
		id: index + 1,
		name: faker.company.name(),
		description: faker.company.catchPhrase(),
		industry: faker.helpers.arrayElement(industries),
		address: faker.location.streetAddress(true),
		image: faker.image.avatarGitHub(),
		phone: faker.phone.number({ style: "national" }),
		timezone: faker.location.timeZone(),
		today: {
			openHour: {
				hour: faker.number.int({ min: 8, max: 12 }),
				minute: faker.number.int({ min: 0, max: 59 }),
			},
			closeHour: {
				hour: faker.number.int({ min: 13, max: 22 }),
				minute: faker.number.int({ min: 0, max: 59 }),
			},
		}
	}));
};

export default generateMockStores;