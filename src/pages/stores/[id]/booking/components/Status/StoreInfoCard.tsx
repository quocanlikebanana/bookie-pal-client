import { useAppSelector } from '@/app/store/hooks';
import { Card, CardContent } from '@/components/ui/card'
import bookingSlice from '@/features/booking/stores/booking/bookingSlice';

export default function StoreInfoCard() {
	const store = useAppSelector(bookingSlice.selectors.selectStore);
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
					<img
						src={"https://cdn-icons-png.flaticon.com/512/4320/4320289.png"}
						alt={store.name}
						className="w-16 h-16 rounded-full"
					/>
				</div>
			</CardContent>
		</Card>
	)
}
