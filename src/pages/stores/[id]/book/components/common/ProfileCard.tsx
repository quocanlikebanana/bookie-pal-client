import React from 'react';
import { Button } from '@/components/ui/button';
import { useBookingTabContext } from '../../context/BookingTabContext';
import { useBookingDataContext } from '../../context/BookingDataContext';
import { TeamMemberSmall } from '@/features/store/apis/store.api-gen';

const ProfileCard: React.FC<{ team: TeamMemberSmall; }> = ({
	team
}) => {
	const { setCurrentTab } = useBookingTabContext();
	const { setTeam } = useBookingDataContext();

	const handleClick = () => {
		setTeam(team);
		setCurrentTab("pickTime");
	}

	return (
		<div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
			<div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center mb-4">
				<span className="text-2xl font-medium">{team.name.charAt(0)}</span>
			</div>

			<p className="mb-4">{team.name}</p>

			<Button
				variant="outline"
				onClick={handleClick}
				className="rounded-full px-8 border-neutral-300 hover:bg-neutral-200 w-full mt-auto"
			>
				Book
			</Button>
		</div>
	);
};

export default ProfileCard;