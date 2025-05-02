import { Card, CardContent } from '@/components/ui/card'
import useGetStore from '@/features/booking/hooks/useGetStore';
import { faker } from '@faker-js/faker';

export default function StoreInfoCard() {
	const store = useGetStore().storeQuery.data;
	if (!store) return null;
	return (
		<Card className="w-full max-w-md rounded-lg shadow-md overflow-hidden border-0 bg-gray-100">
			<CardContent className="p-4">
				<h2 className="text-2xl font-bold text-center">
					{store.name}
				</h2>
				<p className="text-gray-600 text-center mt-2">
					{store.industry}
				</p>
				<div className="mt-4 flex justify-center items-center">
					<img src={faker.image.personPortrait()} alt={store.name} className="w-16 h-16 rounded-full" />
				</div>
			</CardContent>
		</Card>
	)
}
