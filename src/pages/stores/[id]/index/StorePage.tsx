import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";

interface TimeSlot {
	day: string;
	hours: string;
	isClosed: boolean;
}

const StorePage: React.FC = () => {
	const [isTimeOpen, setIsTimeOpen] = useState(false);

	const timeSlots: TimeSlot[] = [
		{ day: "Sunday", hours: "8 AM - 6 PM", isClosed: true },
		{ day: "Monday", hours: "8 AM - 5 PM", isClosed: false },
		{ day: "Tuesday", hours: "8 AM - 5 PM", isClosed: false },
		{ day: "Wednesday", hours: "8 AM - 6 PM", isClosed: false },
		{ day: "Thursday", hours: "8 AM - 5 PM", isClosed: false },
		{ day: "Friday", hours: "8 AM - 5 PM", isClosed: false },
		{ day: "Saturday", hours: "8 AM - 6 PM", isClosed: true },
	];

	const [activeTab, setActiveTab] = useState("Services");
	const tabs = ["Services", "Classes", "Team", "Reviews"];

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			{/* Navigation */}
			<header className="border-b bg-white">
				<div className="container mx-auto px-4 py-3 flex justify-between items-center">
					<nav className="flex space-x-6">
						{tabs.map((tab) => (
							<button
								key={tab}
								className={`py-2 ${activeTab === tab
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
					{activeTab === "Services" && (
						<div className="mb-12">
							<h2 className="text-2xl font-bold mb-6">Services</h2>

							<Collapsible
								className="border rounded-md mb-4"
								open={true}
							>
								<CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
									<span className="text-gray-500">MEETING WITH AN</span>
									<ChevronDown className="h-5 w-5" />
								</CollapsibleTrigger>
								<CollapsibleContent className="p-4 pt-0">
									{/* Service content would go here */}
								</CollapsibleContent>
							</Collapsible>

							<Collapsible className="border rounded-md">
								<CollapsibleTrigger className="flex justify-between items-center w-full p-4 text-left">
									<span className="text-gray-500">OTHER</span>
									<ChevronDown className="h-5 w-5" />
								</CollapsibleTrigger>
								<CollapsibleContent className="p-4">
									{/* Other content would go here */}
								</CollapsibleContent>
							</Collapsible>
						</div>
					)}

					{activeTab === "Classes" && (
						<div>
							<h2 className="text-2xl font-bold mb-6">Classes</h2>
							<div className="flex items-center justify-center py-12 text-gray-500">
								There are no classes to display
							</div>
						</div>
					)}

					{activeTab === "Team" && (
						<div>
							<h2 className="text-2xl font-bold mb-6">Team</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<Card className="overflow-hidden">
									<CardContent className="p-0">
										<div className="flex items-center p-4">
											<div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-xl font-medium">
												A
											</div>
											<div className="flex-1">An Ngo</div>
											<ChevronDown className="h-5 w-5" />
										</div>
									</CardContent>
								</Card>

								<Card className="overflow-hidden">
									<CardContent className="p-0">
										<div className="flex items-center p-4">
											<div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-xl font-medium">
												A
											</div>
											<div className="flex-1">A</div>
											<ChevronDown className="h-5 w-5" />
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					)}

					{activeTab === "Reviews" && (
						<div>
							<h2 className="text-2xl font-bold mb-6">Reviews</h2>
							<div className="flex flex-col md:flex-row items-center justify-between mb-8">
								<p className="mb-4 md:mb-0">Be the first to review us and share insights about your experience.</p>
								<Button variant="outline" className="whitespace-nowrap">
									Write a review
								</Button>
							</div>
						</div>
					)}

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
						<h2 className="text-3xl font-bold mb-4">Ango</h2>
						<Button className="w-full mb-6 py-6 text-lg" size="lg">
							Book
						</Button>

						<div className="mb-4">
							<button
								className="flex items-center text-gray-700 mb-1"
								onClick={() => setIsTimeOpen(!isTimeOpen)}
							>
								<Clock className="h-5 w-5 mr-2" />
								<span className="mr-1 font-medium">Closed now</span>
								{isTimeOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
							</button>
							<div className="text-sm text-gray-500">8 AM – 6 PM</div>
						</div>

						{isTimeOpen && (
							<div className="bg-white rounded-md">
								{timeSlots.map((slot, index) => (
									<div
										key={slot.day}
										className={`flex justify-between py-2 ${slot.day === "Wednesday" ? "font-bold" : ""
											}`}
									>
										<span>{slot.day}</span>
										<span>{slot.isClosed ? "Closed" : slot.hours}</span>
									</div>
								))}
								<div className="text-xs text-right text-gray-500 mt-2">
									Time zone (Indochina Time)
								</div>
							</div>
						)}
					</Card>
				</div>
			</main>
		</div>
	);
};

export default StorePage;