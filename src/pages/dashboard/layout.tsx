import { Outlet, NavLink } from 'react-router';
import { paths } from '@/routers/paths';
import { CalendarDays, History } from 'lucide-react';

export default function DashboardLayout() {
	return (
		<div className="container mx-auto py-8 px-4">
			<h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

			<div className="flex flex-col md:flex-row gap-6">
				{/* Sidebar Navigation */}
				<aside className="w-full md:w-64 bg-white rounded-lg shadow p-4">
					<nav className="space-y-2">
						<NavLink
							to={paths.dashboard.BOOKINGS}
							className={({ isActive }) =>
								`flex items-center p-3 rounded-md transition-colors ${isActive
									? 'bg-primary text-primary-foreground'
									: 'hover:bg-gray-100'
								}`
							}
						>
							<CalendarDays className="mr-2 h-5 w-5" />
							<span>Upcoming Bookings</span>
						</NavLink>
						<NavLink
							to={paths.dashboard.HISTORY}
							className={({ isActive }) =>
								`flex items-center p-3 rounded-md transition-colors ${isActive
									? 'bg-primary text-primary-foreground'
									: 'hover:bg-gray-100'
								}`
							}
						>
							<History className="mr-2 h-5 w-5" />
							<span>Booking History</span>
						</NavLink>
					</nav>
				</aside>

				{/* Main Content Area */}
				<main className="flex-1 bg-white rounded-lg shadow p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}