import { Card, CardContent } from '@/components/ui/card'
import { Team, useGetStoresByStoreIdV2TeamsQuery } from '@/features/booking/apis/booking.api-gen'
import useGetStoreId from '@/features/booking/hooks/useGetStoreId'
import { ChevronDown } from 'lucide-react'

export default function TeamTab() {
	const storeId = useGetStoreId();
	const teamsQuery = useGetStoresByStoreIdV2TeamsQuery({
		storeId,
		page: 1,
		limit: 100,
	});
	const teams = teamsQuery.data?.teams || [];

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Team</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{teams.map((team) => (
					<TeamCard key={team.id} team={team} />
				))}
			</div>
		</div>
	);
}

function TeamCard({ team }: { team: Team }) {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="flex items-center p-4">
					<div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-xl font-medium">
						{team.name.charAt(0)}
					</div>
					<div className="flex-1">{team.name}</div>
					<ChevronDown className="h-5 w-5" />
				</div>
			</CardContent>
		</Card>
	);
}