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

const StoresPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentCategory, setCurrentCategory] = useState("all");


	const filteredStores = stores.filter(store =>
		(currentCategory === "all" || store.industry === currentCategory) &&
		(searchQuery === "" ||
			store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			store.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
	);

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
							{categories.map(category => (
								<TabsTrigger
									key={category.id}
									value={category.id}
									className="rounded-full px-4 py-1.5 data-[state=active]:bg-black data-[state=active]:text-white"
								>
									{category.name}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				</div>
			</section>

			{/* Store Listings */}
			<main className="container mx-auto px-4 py-6 flex-1">
				{filteredStores.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredStores.map(store => (
							<Card key={store.id} className="overflow-hidden hover:shadow-md transition-shadow">
								<div className="relative h-48 bg-gray-200">
									<img
										src="/api/placeholder/500/300"
										alt={store.name}
										className="h-full w-full object-cover"
									/>
									<div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-sm font-medium">
										{store.distance}
									</div>
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
										<span className={`text-sm ${store.hours.isOpen ? "text-green-600" : "text-red-600"}`}>
											{store.hours.isOpen ? "Open" : "Closed"} · {store.hours.open} - {store.hours.close}
										</span>
									</div>

									<div className="flex flex-wrap gap-2 mt-2">
										{store.tags.map((tag, idx) => (
											<span
												key={idx}
												className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1"
											>
												{tag}
											</span>
										))}
									</div>
								</CardContent>
								<CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
									<Button variant="outline" size="sm">
										View Details
									</Button>
									<Button size="sm">
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