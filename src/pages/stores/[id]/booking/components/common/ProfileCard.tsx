import React from 'react';
import { Button } from '@/components/ui/button';
import { Team } from '@/features/booking/apis/booking.api-gen';

const ProfileCard: React.FC<{
	team: Team;
	onClick: () => void;
}> = ({
	team,
	onClick,
}) => {
		return (
			<div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center">
				<div className="bg-gray-200 rounded-full w-20 h-20 flex items-center justify-center mb-4">
					<span className="text-2xl font-medium">{team.name.charAt(0)}</span>
				</div>

				<p className="mb-4">{team.name}</p>

				<Button
					variant="outline"
					onClick={onClick}
					className="rounded-full px-8 border-neutral-300 hover:bg-neutral-200 w-full mt-auto"
				>
					Book
				</Button>
			</div>
		);
	};

export default ProfileCard;