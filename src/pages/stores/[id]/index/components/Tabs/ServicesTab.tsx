import { Service, useGetStoresByStoreIdServicesQuery } from '@/features/booking/apis/booking.api-gen'
import useGetStoreId from '@/features/booking/hooks/useGetStoreId';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react';

export default function Services() {
	const storeId = useGetStoreId();
	const servicesQuery = useGetStoresByStoreIdServicesQuery({
		storeId,
		page: 1,
		limit: 1000
	}, {
		skip: !storeId
	});
	const services = servicesQuery.data?.services;

	const servicesByCategory = useMemo(() => services?.reduce(
		(acc, service) => {
			const category = service.category || 'Other';
			if (!acc[category]) {
				acc[category] = [];
			}
			acc[category].push(service);
			return acc;
		}, {} as Record<string, Service[]>) || {},
		[services]);
	if (!services) return null;

	return (
		<div className="mb-12">
			<h2 className="text-2xl font-bold mb-6">Services</h2>

			{Object.entries(servicesByCategory).length === 0 ? (
				<p className="text-gray-500">No services available.</p>
			) : (
				<div>
					<ServiceCategory
						category="All Services"
						services={services}
					/>

					<h3 className="text-lg font-semibold mb-4">Services by Category</h3>

					{Object.entries(servicesByCategory).map(([category, services]) => (
						<ServiceCategory
							key={category}
							category={category}
							services={services}
						/>
					))}
				</div>
			)}
		</div>
	)
}

function ServiceItem({ service }: { service: Service }) {
	return (
		<div className="flex items-center justify-between mb-2">
			<div className="flex items-center">
				<img
					src={"https://cdn-icons-png.flaticon.com/256/9321/9321345.png"}
					alt={service.name}
					className="w-16 h-16 rounded-md mr-4"
				/>
				<div>
					<h3 className="text-lg font-semibold">{service.name}</h3>
					<p className="text-gray-500">{service.description}</p>
				</div>
			</div>
			<div className="text-right">
				<p className="text-gray-500">Duration: {service.duration} min</p>
				<p className="text-gray-500">Category: {service.category}</p>
			</div>
		</div>
	)
}

function ServiceCategory({ category, services }: { category: string, services: Service[] }) {
	const [open, setOpen] = useState(false);
	return (
		<Collapsible
			className="border rounded-md mb-4"
			open={open}
		>
			<CollapsibleTrigger onClick={() => setOpen(!open)} className="flex justify-between items-center w-full p-4 text-left cursor-pointer  hover:bg-gray-200 transition-colors duration-200 ease-in-out">
				<span className="text-gray-500">{category.toUpperCase()}</span>
				{open ? (
					<ChevronDown className="h-5 w-5" />
				) : (
					<ChevronDown className="h-5 w-5 rotate-180" />
				)}
			</CollapsibleTrigger>
			<CollapsibleContent className="CollapsibleContent p-4 flex flex-col gap-2">
				{services.map(service => (
					<ServiceItem key={service.id} service={service} />
				))}
			</CollapsibleContent>
		</Collapsible>
	)
}