import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import ProfileCard from "../common/ProfileCard";
import bookingSelectors from "@/features/booking/stores/booking/booking.selectors";
import { useBookingTabContext } from "../../context/booking-tab.context";
import bookingSlice from "@/features/booking/stores/booking/bookingSlice";

const ChooseTeamTab: React.FC = () => {
	const teams = useAppSelector(bookingSelectors.selectCurrentTeamsOfService);
	const dispatch = useAppDispatch();

	const { setCurrentTab } = useBookingTabContext();

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