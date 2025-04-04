import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Search,
	MapPin,
	Star,
	Clock,
	ChevronRight,
	Filter,
	SortAsc
} from "lucide-react";
import { Store } from "@/features/store/types/query";
import { useGetIndustriesQuery } from "@/features/store/apis/store.api-gen";
import generateMockStores from "@/mocks/stores";
import TimeUtil from "@/global/models/time";
import { useNavigate } from "react-router";
import paths from "@/routes/paths";

const StoresPage: React.FC = () => {
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");
	const [currentCategory, setCurrentCategory] = useState("all");

	const { data: industries } = useGetIndustriesQuery();
	const stores: Store[] = generateMockStores(10);


	if (!industries) return null;

	return (
		<>
			{/* Header */}
			<header className="bg-white border-b">
				<div className="container mx-auto px-4 py-4">
					<h1 className="text-2xl font-bold">Discover Stores</h1>
				</div>
			</header>

			{/* Search and Filter Section */}
			<section className="bg-white border-b shadow-sm sticky top-0 z-10">
				<div className="container mx-auto px-4 py-3">
					<div className="flex items-center space-x-2">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
							<Input
								placeholder="Search stores, services, or tags..."
								className="pl-10"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<Button variant="outline" size="icon">
							<Filter size={18} />
						</Button>
						<Button variant="outline" size="icon">
							<SortAsc size={18} />
						</Button>
					</div>
				</div>
			</section>

			{/* Category Tabs */}
			<section className="bg-white border-b">
				<div className="container mx-auto px-4">
					<Tabs
						defaultValue="all"
						value={currentCategory}
						onValueChange={setCurrentCategory}
						className="w-full"
					>
						<TabsList className="flex overflow-x-auto py-2 space-x-2 w-full h-auto bg-transparent">
							{industries.map((industry, index) => (
								<TabsTrigger
									key={index}
									value={industry}
									className="rounded-full px-4 py-1.5 data-[state=active]:bg-black data-[state=active]:text-white"
								>
									{industry}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			</section>

			{/* Store Listings */}
			<main className="container mx-auto px-4 py-6 flex-1">
				{stores.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{stores.map(store => (
							<Card
								key={store.id}
								className="overflow-hidden hover:shadow-md transition-shadow"
							>
								<div className="relative h-48 bg-gray-200">
									<img
										src={store.image}
										alt={store.name}
										className="h-full w-full object-cover"
									/>
								</div>
								<CardContent className="p-4">
									<div className="flex justify-between items-start mb-2">
										<h3 className="text-xl font-bold">{store.name}</h3>
										<div className="flex items-center">
											<Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
											<span className="font-medium">{store.rating}</span>
											<span className="text-gray-500 text-sm ml-1">({store.totalReviews})</span>
										</div>
									</div>

									<div className="flex items-center text-gray-500 mb-3">
										<MapPin className="h-4 w-4 mr-1" />
										<span className="text-sm">{store.address}</span>
									</div>

									<div className="flex items-center mb-3">
										<Clock className="h-4 w-4 mr-1" />
										<span className={`text-sm ${store.today.isOpenToday ? "text-green-600" : "text-red-600"}`}>
											{store.today.isOpenToday
												? "Open"
												: "Closed"
											}
											· {TimeUtil.toString(store.today.openHour)} - {TimeUtil.toString(store.today.closeHour)}
										</span>
									</div>

									<div className="flex flex-wrap gap-2 mt-2">
										<span
											className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1"
										>
											{store.industry}
										</span>
									</div>
								</CardContent>
								<CardFooter className="p-4 flex justify-between items-center">
									<Button onClick={() => navigate(paths.stores.in(store.id).ROOT)} variant="outline" size="sm">
										View Details
									</Button>
									<Button onClick={() => navigate(paths.stores.in(store.id).BOOK)} size="sm">
										Book
										<ChevronRight className="h-4 w-4 ml-1" />
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-16 text-gray-500">
						<p className="mb-4">No stores found matching your search criteria.</p>
						<Button variant="outline" onClick={() => { setSearchQuery(""); setCurrentCategory("all"); }}>
							Clear filters
						</Button>
					</div>
				)}
			</main>

			{/* Footer */}
			<footer className="bg-white border-t py-6">
				<div className="container mx-auto px-4 text-center text-gray-500 text-sm">
					<p>© 2025 StoreBooker. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
};

export default StoresPage;