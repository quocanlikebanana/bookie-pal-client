import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BusinessHours from "./components/BusinessHours";
import Services from "./components/Services";
import Classes from "./components/Classes";
import Team from "./components/Team";
import Reviews from "./components/Reviews";
import generateMockStores from "@/mocks/stores";
import { useNavigate } from "react-router";
import paths from "@/routes/paths";

const StorePage: React.FC = () => {
	const navigate = useNavigate();
	const tabs = ["Services", "Classes", "Team", "Reviews"];
	const [activeTab, setActiveTab] = useState("Services");

	const store = generateMockStores(1)[0];

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			{/* Navigation */}
			<header className="border-b bg-white">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<nav className="flex space-x-6">
						{tabs.map((tab) => (
							<button
								key={tab}
								className={`py-2 cursor-pointer ${activeTab === tab
									? "border-b-2 border-black font-medium"
									: "text-gray-500"
									}`}
								onClick={() => setActiveTab(tab)}
							>
								{tab}
							</button>
						))}
					</nav>
					<div className="flex space-x-4">
						<button className="p-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
								<polyline points="7 10 12 15 17 10" />
								<line x1="12" y1="15" x2="12" y2="3" />
							</svg>
						</button>
						<button className="p-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
								<circle cx="12" cy="7" r="4" />
							</svg>
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
				{/* Left Column */}
				<div className="w-full md:w-2/3 pr-0 md:pr-8">
					<div>
						{activeTab === "Services" && <Services />}

						{activeTab === "Classes" && <Classes />}

						{activeTab === "Team" && <Team />}

						{activeTab === "Reviews" && <Reviews />}
					</div>

					{/* Good to know section */}
					<div className="mt-8 pt-8 border-t">
						<h3 className="text-xl font-bold mb-4">Good to know</h3>
						<div className="flex items-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
								<line x1="16" y1="2" x2="16" y2="6"></line>
								<line x1="8" y1="2" x2="8" y2="6"></line>
								<line x1="3" y1="10" x2="21" y2="10"></line>
							</svg>
							<a href="#" className="text-gray-700 underline">Booking policy</a>
						</div>
					</div>
				</div>

				{/* Right Column / Booking Card */}
				<div className="w-full md:w-1/3 mt-8 md:mt-0">
					<Card className="p-6 bg-white">
						<h2 className="text-3xl font-bold mb-4">{store.name}</h2>
						<Button onClick={() => navigate(paths.stores.in(store.id).BOOK)} className="w-full mb-6 py-6 text-lg" size="lg">
							Book
						</Button>

						<BusinessHours />
					</Card>
				</div>
			</main>
		</div>
	);
};

export default StorePage;