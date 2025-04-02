import { Outlet } from 'react-router'

export default function Layout() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<Outlet />
		</div>
	)
}
