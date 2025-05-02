import { Service } from "@/features/booking/types/query";
import { faker } from "@faker-js/faker";

const serviceAppearance = [
	"🔥", "🌟", "🎉"
];

const categories = [
	{
		id: faker.string.uuid(),
		name: "Meeting",
	},
	{
		id: faker.string.uuid(),
		name: "Other",
	},
	{
		id: faker.string.uuid(),
		name: "Business",
	}
]

const generateMockServices = (count: number): Service[] => {
	return Array.from({ length: count }, (_, index) => ({
		id: faker.string.uuid(),
		storeId: "storeId", // Replace with actual store ID if needed
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		category: faker.helpers.arrayElement(categories),
		duration: faker.number.int({ min: 15, max: 120 }),
		price: `$${(index + 1) * 10}`,
		appearance: faker.helpers.arrayElement(serviceAppearance),
	}));
}


export default generateMockServices;