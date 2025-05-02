import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import ProfileCard from "../common/ProfileCard";
import { useBookingTabContext } from "../../context/booking-tab.context";
import bookingSlice from "@/features/booking/stores/booking/bookingSlice";
import { useGetServicesByServiceIdTeamsQuery } from "@/features/booking/apis/booking.api-gen";

const ChooseTeamTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const { setCurrentTab } = useBookingTabContext();

	const service = useAppSelector(bookingSlice.selectors.selectService);
	const teamsOfServiceQuery = useGetServicesByServiceIdTeamsQuery({
		serviceId: service?.id || "",
		page: 1,
		limit: 100,
	}, {
		skip: !service?.id,
	});
	const teams = teamsOfServiceQuery.data?.teams || [];

	return (
		<div className="p-6 rounded-lg">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{teams.map((team) => (
					<ProfileCard
						key={team.id}
						team={team}
						onClick={() => {
							dispatch(bookingSlice.actions.setTeam(team));
							setCurrentTab("pickTime");
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default ChooseTeamTab;