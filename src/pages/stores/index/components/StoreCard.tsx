import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { paths } from "@/routers/paths";
import { faker } from "@faker-js/faker";
import { generateMockRating, generateMockTotalReviews } from "@/mocks/stores";
import { StoreUtil } from "@/app/models/storeUtil";
import { Store } from "@/features/booking/apis/booking.api-gen";

interface StoreCardProps {
	store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
	const navigate = useNavigate();
	const isOpenTodayDisplay = StoreUtil.isOpenTodayDisplay(store);

	return (
		<Card className="overflow-hidden hover:shadow-md transition-shadow">
			<div className="relative h-48 bg-gray-200">
				<img
					src={faker.image.avatar()}
					alt={store.name}
					className="h-full w-full object-cover"
				/>
			</div>
			<CardContent className="p-4">
				<div className="flex justify-between items-start mb-2">
					<h3 className="text-xl font-bold">{store.name}</h3>
					<div className="flex items-center">
						<Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
						<span className="font-medium">{generateMockRating()}</span>
						<span className="text-gray-500 text-sm ml-1">({generateMockTotalReviews()})</span>
					</div>
				</div>

				<div className="flex items-center text-gray-500 mb-3">
					<MapPin className="h-4 w-4 mr-1" />
					<span className="text-sm">{store.address}</span>
				</div>

				<div className="flex items-center mb-3">
					<Clock className="h-4 w-4 mr-1" />
					<span className={`text-sm ${isOpenTodayDisplay.isOpen
						? "text-green-600"
						: "text-red-600"
						}`}>
						{isOpenTodayDisplay.isOpen
							? "Open"
							: "Closed"
						}
						<span>·</span>
						<span className="text-gray-500">{isOpenTodayDisplay.timeRangesDisplay}</span>
					</span>
				</div>

				<div className="flex flex-wrap gap-2 mt-2">
					<span className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1">
						{store.industry}
					</span>
				</div>
			</CardContent>
			<CardFooter className="p-4 flex justify-between items-center">
				<Button onClick={() => navigate(paths.stores.in(store.id).ROOT)} variant="outline" size="sm">
					View Details
				</Button>
				<Button onClick={() => navigate(paths.stores.in(store.id).BOOKING)} size="sm">
					Book
					<ChevronRight className="h-4 w-4 ml-1" />
				</Button>
			</CardFooter>
		</Card>
	);
};

export default StoreCard;