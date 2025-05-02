import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SortAsc } from "lucide-react";

interface HeaderProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	currentCategory: string;
	setCurrentCategory: (category: string) => void;
	industries: string[];
}

const Header: React.FC<HeaderProps> = ({
	searchQuery,
	setSearchQuery,
	currentCategory,
	setCurrentCategory,
	industries,
}) => {
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
		</>
	);
};

export default Header;