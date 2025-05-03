import React, { useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { paths } from "@/routers/paths";
import useGetStoreId from "@/features/booking/hooks/useGetStoreId";
import ChooseServiceTab from "./Tabs/ChooseServiceTab";
import { Tab, useBookingTabContext } from "../context/booking-tab.context";
import ChooseTeamTab from "./Tabs/ChooseTeamTab";
import PickTimeTab from "./Tabs/PickTimeTab";
import FillFormTab from "./Tabs/FillFormTab";
import BookingStatusCard from "./Status/BookingStatusCard";
import StoreInfoCard from "./Status/StoreInfoCard";
import BookedTab from "./Tabs/BookedTab";

const StoreBookMain: React.FC = () => {
	const navigate = useNavigate();
	const storeId = useGetStoreId();
	const {
		currentTab,
		setCurrentTab,
	} = useBookingTabContext();

	const tabComponents: Record<Tab, {
		component: React.FC;
		title: string;
		navigateBack: () => void;
	}> = useMemo(() => ({
		chooseService: {
			component: ChooseServiceTab,
			title: "Select a Service",
			navigateBack: () => {
				navigate(paths.stores.in(storeId).ROOT);
			},
		},
		chooseTeam: {
			component: ChooseTeamTab,
			title: "Choose Team",
			navigateBack: () => {
				setCurrentTab("chooseService");
			},
		},
		pickTime: {
			component: PickTimeTab,
			title: "Pick your Time",
			navigateBack: () => {
				setCurrentTab("chooseTeam");
			},
		},
		fillForm: {
			component: FillFormTab,
			title: "Fill in the Form",
			navigateBack: () => {
				setCurrentTab("pickTime");
			},
		},
		booked: {
			component: BookedTab,
			title: "Booking Confirmed",
			navigateBack: () => {
				navigate(paths.stores.in(storeId).ROOT);
			},
		},
	}), [setCurrentTab, storeId, navigate]);

	return (
		<div>
			{/* Header */}
			<header className="p-4 flex items-center">
				<ChevronLeft
					onClick={tabComponents[currentTab].navigateBack}
					className="mr-4 cursor-pointer"
					size={24}
				/>
				<h1 className="text-xl font-bold">
					{tabComponents[currentTab].title}
				</h1>
			</header>

			{/* Main Content */}
			<div className="flex flex-col md:flex-row px-4 gap-6">

				{/* Main content */}
				<div className="w-full flex-1 mr-auto">
					{React.createElement(tabComponents[currentTab].component)}
				</div>

				{/* Right Column - Company Info */}
				{currentTab !== "booked" && (
					<div className="flex flex-col gap-2 w-1/3 max-w-md">
						<StoreInfoCard />
						<BookingStatusCard />
					</div>
				)}
			</div>

		</div>
	);
};

export default StoreBookMain;