import ProfileCard from "../common/ProfileCard";
import { useGetServicesByServiceIdTeamsQuery } from "@/features/store/apis/store.api-gen";
import { useBookingServiceInfoContext } from "../../context/BookingServiceInfoContext";

export default function ChooseTeamTab() {
	const { selectedService } = useBookingServiceInfoContext();
	const { data: teams } = useGetServicesByServiceIdTeamsQuery({
		serviceId: selectedService?.id || "",
	}, {
		refetchOnMountOrArgChange: true,
	})

	if (!teams) return null;

	return (
		<div className="p-6 rounded-lg">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
