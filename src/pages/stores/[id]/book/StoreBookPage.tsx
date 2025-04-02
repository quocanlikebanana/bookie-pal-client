import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

interface ServiceItem {
	id: string;
	name: string;
	duration: string;
	price: string;
	icon: string;
}

const StoreBookPage: React.FC = () => {
	const [expandedSections, setExpandedSections] = useState({
		meetingWithAn: true,
		other: true
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections({
			...expandedSections,
			[section]: !expandedSections[section]
		});
	};

	const meetingServices: ServiceItem[] = [
		{
			id: "15min",
			name: "15 Minutes Meeting",
			duration: "15 mins",
			price: "Free",
			icon: "🌲"
		}
	];

	const otherServices: ServiceItem[] = [
		{
			id: "30min",
			name: "30 Minutes Meeting",
			duration: "30 mins",
			price: "Free",
			icon: "🌲"
		},
		{
			id: "1hour",
			name: "1 Hour Meeting",
			duration: "1 hr",
			price: "Free",
			icon: "🌲"
		},
		{
			id: "haircut",
			name: "Hari cut",
			duration: "1 hr",
			price: "Free",
			icon: "🌲"
		}
	];

	const renderServiceItem = (service: ServiceItem) => (
		<div key={service.id} className="flex items-center justify-between px-4 py-3 border border-gray-700 rounded-lg mb-3 cursor-pointer hover:bg-gray-800">
			<div className="flex items-center">
				<div className="bg-white rounded-md w-12 h-12 flex items-center justify-center mr-4">
					<span className="text-lg">{service.icon}</span>
				</div>
				<div>
					<h3 className="text-white font-medium">{service.name}</h3>
					<div className="text-gray-400 text-sm flex items-center">
						<span>{service.duration}</span>
						<span className="mx-2">•</span>
						<span>{service.price}</span>
					</div>
				</div>
			</div>
			<ChevronRight className="text-gray-400" size={20} />
		</div>
	);

	return (
		<div className="min-h-screen bg-black text-white">
			{/* Header */}
			<header className="p-4 flex items-center">
				<ChevronLeft className="mr-2" size={24} />
				<h1 className="text-xl font-medium">Select a service or class</h1>
			</header>

			{/* Main Content */}
			<div className="flex flex-col md:flex-row px-4 gap-6">
				{/* Left Column - Services */}
				<div className="flex-1 bg-gray-900 rounded-xl p-6">
					<h2 className="text-xl font-bold mb-6">Services</h2>

					{/* Meeting With An Section */}
					<div className="mb-6">
						<div
							className="flex justify-between items-center text-gray-400 mb-3 cursor-pointer"
							onClick={() => toggleSection('meetingWithAn')}
						>
							<span>MEETING WITH AN</span>
							{expandedSections.meetingWithAn ? (
								<ChevronUp size={20} />
							) : (
								<ChevronDown size={20} />
							)}
						</div>

						{expandedSections.meetingWithAn && (
							<div className="space-y-2">
								{meetingServices.map(renderServiceItem)}
							</div>
						)}
					</div>

					{/* Other Section */}
					<div className="mb-6">
						<div
							className="flex justify-between items-center text-gray-400 mb-3 cursor-pointer"
							onClick={() => toggleSection('other')}
						>
							<span>OTHER</span>
							{expandedSections.other ? (
								<ChevronUp size={20} />
							) : (
								<ChevronDown size={20} />
							)}
						</div>

						{expandedSections.other && (
							<div className="space-y-2">
								{otherServices.map(renderServiceItem)}
							</div>
						)}
					</div>

					{/* Classes Section */}
					<div>
						<h2 className="text-xl font-bold mb-6">Classes</h2>
						<div className="flex items-center justify-center py-12 text-gray-400">
							There are no classes to display
						</div>
					</div>
				</div>

				{/* Right Column - Company Info */}
				<div className="md:w-96 bg-gray-900 rounded-xl p-6 h-fit">
					<h2 className="text-2xl font-bold text-center">Ango</h2>
				</div>
			</div>
		</div>
	);
};

export default StoreBookPage;