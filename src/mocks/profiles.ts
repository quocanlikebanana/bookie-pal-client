import { faker } from '@faker-js/faker';
import { Profile } from '../features/booking/types/query';

function generateMockProfiles(length?: number): Profile[] {
	if (length == null) {
		length = faker.helpers.maybe(
			() => faker.number.int({ min: 1, max: 10 }),
			{ probability: 0.5 }
		) || 0;
	}
	return Array.from({ length }, () => ({
		id: faker.string.uuid(),
		name: faker.person.firstName(),
		appeance: faker.helpers.maybe(() => faker.image.avatar(), { probability: 0.8 }),
	}));
}

export default generateMockProfiles;