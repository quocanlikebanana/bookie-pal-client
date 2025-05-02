import React, { useState } from "react";
import { useGetIndustriesQuery, useGetStoresQuery } from "@/features/booking/apis/booking.api-gen";
import Header from "./components/Header";
import StoreList from "./components/StoreList";
import Footer from "./components/Footer";

const StoresPage: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [currentCategory, setCurrentCategory] = useState("all");

	const { data: industries } = useGetIndustriesQuery();
	const { data: stores } = useGetStoresQuery({
		page: 1,
		limit: 10,
	});

	if (!industries) return null;
	if (!stores) return null;

	return (
		<>
			<Header
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				currentCategory={currentCategory}
				setCurrentCategory={setCurrentCategory}
				industries={industries}
			/>

			<main className="container mx-auto px-4 py-6 flex-1">
				<StoreList
					stores={stores.stores}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					currentCategory={currentCategory}
					setCurrentCategory={setCurrentCategory}
				/>
			</main>

			<Footer />
		</>
	);
};

export default StoresPage;