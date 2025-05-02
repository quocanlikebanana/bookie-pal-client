import React from "react";
import { Button } from "@/components/ui/button";
import StoreCard from "./StoreCard";

interface StoreListProps {
	stores: Array<any> | null;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	currentCategory: string;
	setCurrentCategory: (category: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({
	stores,
	searchQuery,
	setSearchQuery,
	currentCategory,
	setCurrentCategory
}) => {
	if (!stores || stores.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-gray-500">
				<p className="mb-4">No stores found matching your search criteria.</p>
				<Button variant="outline" onClick={() => { setSearchQuery(""); setCurrentCategory("all"); }}>
					Clear filters
				</Button>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{stores.map(store => (
				<StoreCard key={store.id} store={store} />
			))}
		</div>
	);
};

export default StoreList;