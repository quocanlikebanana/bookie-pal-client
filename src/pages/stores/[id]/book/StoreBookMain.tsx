import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import paths from "@/routes/paths";
import useGetStoreIdFromParams from "@/features/store/hooks/useGetStoreIdFromParams";
import ChooseServiceTab from "./components/Tabs/ChooseServiceTab";
import { useBookingTabContext } from "./context/BookingTabContext";

const StoreBookMain: React.FC = () => {
	const navigate = useNavigate();
	const storeId = useGetStoreIdFromParams();
	const { currentTab } = useBookingTabContext();

	return (
		<div>
			{/* Header */}
			<header className="p-4 flex items-center">
				<ChevronLeft onClick={() => navigate(paths.stores.in(storeId).ROOT)} className="mr-2" size={24} />
				<h1 className="text-xl font-medium">Select a service</h1>
			</header>

			{/* Main Content */}
			<div className="flex flex-col md:flex-row px-4 gap-6">

				{/* Main content */}

				{currentTab === "chooseService" && <ChooseServiceTab />}


				{/* Right Column - Company Info */}
				<div className="md:w-96 bg-gray-100 rounded-xl p-6 h-fit">
					<h2 className="text-2xl font-bold text-center">Ango</h2>
				</div>
			</div>

		</div>
	);
};

export default StoreBookMain;