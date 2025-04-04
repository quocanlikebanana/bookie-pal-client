import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@radix-ui/react-collapsible'
import { ChevronDown } from 'lucide-react'

export default function Services() {
	return (
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
	)
}
