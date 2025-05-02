import { useBookingDataContext } from "../../context/booking-data.context";
import ProfileCard from "../common/ProfileCard";
import { useGetServicesByServiceIdTeamsQuery } from "@/features/booking/apis/booking.api-gen";

const ChooseTeamTab: React.FC = () => {
	const { service } = useBookingDataContext();
	const { data: teams } = useGetServicesByServiceIdTeamsQuery({
		serviceId: service?.id || "",
	}, {
		skip: service == null,
		refetchOnMountOrArgChange: true,
	})

	if (!teams) return null;

	return (
		<div className="p-6 rounded-lg">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{teams.map((team) => (
					<ProfileCard
						key={team.id}
						team={team}
					/>
				))}
			</div>
		</div>
	)
}

export default ChooseTeamTab;