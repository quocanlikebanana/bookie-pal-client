import StoreBookPage from "@/pages/stores/[id]/book/StoreBookPage";
import StorePage from "@/pages/stores/[id]/index/StorePage";
import StoresPage from "@/pages/stores/index/StoresPage";
import { BrowserRouter, Routes, Route } from "react-router";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route index element={<StoresPage />} />
					<Route path=":id/">
						<Route index element={<StorePage />} />
						<Route path="book" element={<StoreBookPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}