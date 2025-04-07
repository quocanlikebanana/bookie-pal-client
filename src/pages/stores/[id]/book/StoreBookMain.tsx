import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import paths from "@/routes/paths";
import useGetStoreIdFromParams from "@/features/store/hooks/useGetStoreIdFromParams";
import ChooseServiceTab from "./components/Tabs/ChooseServiceTab";
import { useBookingTabContext } from "./context/BookingTabContext";
import ChooseTeamTab from "./components/Tabs/ChooseTeamTab";
import PickTimeTab from "./components/Tabs/PickTimeTab";
import FillFormTab from "./components/Tabs/FillFormTab";
import BookingStatusCard from "./components/Status/BookingStatusCard";
import StoreInfoCard from "./components/Status/StoreInfoCard";
import BookedTab from "./components/Tabs/BookedTab";

const StoreBookMain: React.FC = () => {
	const navigate = useNavigate();
	const storeId = useGetStoreIdFromParams();
	const {
		currentTab,
		setCurrentTab,
	} = useBookingTabContext();

	const handleNavigateBack = () => {
		switch (currentTab) {
			case "chooseService":
				navigate(paths.stores.in(storeId).ROOT);
				break;
			case "chooseTeam":
				setCurrentTab("chooseService");
				break;
			case "pickTime":
				setCurrentTab("chooseTeam");
				break;
			case "fillForm":
				setCurrentTab("pickTime");
				break;
			case "booked":
				setCurrentTab("fillForm");
				break;
		}
	};

	return (
		<div>
			{/* Header */}
			<header className="p-4 flex items-center">
				<ChevronLeft onClick={handleNavigateBack} className="mr-2 cursor-pointer" size={24} />
			</header>

			{/* Main Content */}
			<div className="flex flex-col md:flex-row px-4 gap-6">

				{/* Main content */}
				<div className="w-full flex-1 mr-auto">
					{currentTab === "chooseService" && <ChooseServiceTab />}
					{currentTab === "chooseTeam" && <ChooseTeamTab />}
					{currentTab === "pickTime" && <PickTimeTab />}
					{currentTab === "fillForm" && <FillFormTab />}
					{currentTab === "booked" && <BookedTab />}
				</div>

				{/* Right Column - Company Info */}
				<div className="flex flex-col gap-2 w-1/3 max-w-md">
					<StoreInfoCard />
					<BookingStatusCard />
				</div>
			</div>

		</div>
	);
};

export default StoreBookMain;