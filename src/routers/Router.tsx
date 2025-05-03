import StorePage from "@/pages/stores/[id]/index/page";
import StoresPage from "@/pages/stores/index/page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { paths } from "./paths";
import StoreBookPage from "@/pages/stores/[id]/booking/page";
import Layout from "@/pages/layout";
import AuthLayout from "@/pages/auth/layout";
import AuthLoginPage from "@/pages/auth/login/page";
import AuthRegisterPage from "@/pages/auth/register/page";
import StoreLayout from "@/pages/stores/[id]/layout";
import DashboardLayout from "@/pages/dashboard/layout";
import BookingsPage from "@/pages/dashboard/bookings/page";
import HistoryPage from "@/pages/dashboard/history/page";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={paths.ROOT} element={<Layout />}>
					<Route
						index
						element={<Navigate to={paths.stores.ROOT} />}
					/>

					{/* Auth Routes */}
					<Route
						path={paths.auth.ROOT}
						element={<AuthLayout />}
					>
						<Route
							path={paths.auth.LOGIN}
							element={<AuthLoginPage />}
						/>
						<Route
							path={paths.auth.REGISTER}
							element={<AuthRegisterPage />}
						/>
					</Route>

					{/* Store Routes */}
					<Route path={paths.stores.ROOT}>
						<Route
							index
							element={<StoresPage />}
						/>
						<Route
							path={paths.stores.in().ROOT}
							element={<StoreLayout />}
						>
							<Route
								index
								element={<StorePage />}
							/>
							<Route
								path={paths.stores.in().BOOKING}
								element={<StoreBookPage />}
							/>
						</Route>
					</Route>

					{/* Dashboard Routes */}
					<Route
						path={paths.dashboard.ROOT}
						element={<DashboardLayout />}
					>
						<Route
							index
							element={<Navigate to={paths.dashboard.BOOKINGS} />}
						/>
						<Route
							path={paths.dashboard.BOOKINGS}
							element={<BookingsPage />}
						/>
						<Route
							path={paths.dashboard.HISTORY}
							element={<HistoryPage />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}