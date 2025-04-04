import StoreBookMain from "@/pages/stores/[id]/book/StoreBookMain";
import StorePage from "@/pages/stores/[id]/index/StorePage";
import StoresPage from "@/pages/stores/index/StoresPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import paths from "./paths";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={paths.ROOT}>
					<Route index element={<Navigate to={paths.stores.ROOT} />} />
					<Route path={paths.stores.ROOT}>
						<Route index element={<StoresPage />} />
						<Route path={paths.stores.in().ROOT} >
							<Route index element={<StorePage />} />
							<Route path={paths.stores.in().BOOK} element={<StoreBookMain />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}