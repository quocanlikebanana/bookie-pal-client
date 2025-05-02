import { ChevronUp, ChevronDown } from "lucide-react"
import React from "react"
import ServiceItem from "./ServiceItem";
import { Service } from "@/features/booking/apis/booking.api-gen";

export default function ServiceCategorySection({
	services,
	categoryName,
}: {
	services: Service[];
	categoryName: string;
}) {
	const [isExpanded, setIsExpanded] = React.useState(false)

	return (
		<div className="mb-6">
			<div
				className="flex justify-between items-center text-gray-600 mb-3 cursor-pointer"
				onClick={() => setIsExpanded(prev => !prev)}
			>
				<span>{categoryName}</span>
				{isExpanded ? (
					<ChevronUp size={20} />
				) : (
					<ChevronDown size={20} />
				)}
			</div>

			{isExpanded && (
				<div className="space-y-2">
					{services.map(service => <ServiceItem service={service} key={service.id} />)}
				</div>
			)}
		</div>
	)
}