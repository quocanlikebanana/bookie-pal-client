import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import ServiceCategorySection from "../common/ServiceCategorySection";
import ServiceItem from "../common/ServiceItem";
import { Service, useGetStoresByStoreIdServicesQuery } from "@/features/booking/apis/booking.api-gen";
import useGetStoreIdFromParams from "@/features/booking/hooks/useGetStoreIdFromParams";

const ChooseServiceTab: React.FC = () => {
	const storeId = useGetStoreIdFromParams();
	const [isMainExpanded, setIsMainExpanded] = useState(true);
	const { data: services } = useGetStoresByStoreIdServicesQuery({
		storeId
	});

	if (!services) return null;

	const serviceByCategory = services.reduce((acc, service) => {
		if (!service) return acc;
		if (!acc[service.category]) {
			acc[service.category] = {
				categoryName: service.category,
				service: []
			};
		}
		acc[service.category].service.push(service);
		return acc;
	}, {} as Record<string, {
		categoryName: string;
		service: Service[];
	}>);

	return (
		<>
			<div className="flex-1 bg-gray-100 rounded-xl p-6">
				<h2 className="text-xl font-bold mb-6">Services</h2>

				{/* All services Section */}
				<div className="mb-6">
					<div
						className="flex justify-between items-center mb-3 cursor-pointer"
						onClick={() => setIsMainExpanded(prev => !prev)}
					>
						<span className="font-medium">ALL SERVICES</span>
						{isMainExpanded ? (
							<ChevronUp size={20} />
						) : (
							<ChevronDown size={20} />
						)}
					</div>

					{isMainExpanded && (
						<div className="space-y-2">
							{services.map(service => {
								return <ServiceItem service={service} key={service.id} />
							})}
						</div>
					)}
				</div>

				{/* Categorized Section */}
				{Object.keys(serviceByCategory).map(serviceCategory => {
					return <ServiceCategorySection
						services={serviceByCategory[serviceCategory].service}
						categoryName={serviceByCategory[serviceCategory].categoryName}
						key={serviceCategory}
					/>
				})}
			</div>
		</>
	)
}

export default ChooseServiceTab;