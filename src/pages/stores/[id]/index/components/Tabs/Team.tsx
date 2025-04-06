import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'

export default function Team() {
	return (
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
	)
}
