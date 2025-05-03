import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock data for upcoming bookings
// Will be replaced with API call
const mockUpcomingBookings = [
	{
		id: '1',
		storeName: 'Urban Cuts Barbershop',
		serviceType: 'Haircut & Styling',
		date: '2025-05-10T14:30:00',
		teamMember: 'Alex Johnson',
		duration: '45 min',
		status: 'confirmed',
		location: '123 Main St, New York, NY'
	},
	{
		id: '2',
		storeName: 'Zen Spa & Wellness',
		serviceType: 'Swedish Massage',
		date: '2025-05-15T10:00:00',
		teamMember: 'Sarah Williams',
		duration: '60 min',
		status: 'confirmed',
		location: '456 Park Ave, New York, NY'
	}
];

export default function BookingsPage() {
	const [selectedTab, setSelectedTab] = useState('upcoming');
	const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
	const [isCancelOpen, setIsCancelOpen] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<any>(null);

	const handleReschedule = (booking: any) => {
		setSelectedBooking(booking);
		setIsRescheduleOpen(true);
	};

	const handleCancel = (booking: any) => {
		setSelectedBooking(booking);
		setIsCancelOpen(true);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const confirmReschedule = () => {
		// Will implement API call to reschedule booking
		setIsRescheduleOpen(false);
	};

	const confirmCancel = () => {
		// Will implement API call to cancel booking
		setIsCancelOpen(false);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Manage Your Bookings</h2>

			<Tabs defaultValue="upcoming" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
				<TabsList className="mb-4">
					<TabsTrigger value="upcoming">Upcoming</TabsTrigger>
					<TabsTrigger value="pending">Pending</TabsTrigger>
				</TabsList>

				<TabsContent value="upcoming" className="space-y-4">
					{mockUpcomingBookings.map(booking => (
						<Card key={booking.id} className="overflow-hidden">
							<CardHeader className="pb-2">
								<div className="flex justify-between">
									<CardTitle>{booking.storeName}</CardTitle>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
										{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
									</span>
								</div>
								<CardDescription>{booking.serviceType}</CardDescription>
							</CardHeader>

							<CardContent className="pb-2">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-center">
										<Calendar className="h-4 w-4 mr-2 text-gray-500" />
										<span>{formatDate(booking.date)}</span>
									</div>
									<div className="flex items-center">
										<Clock className="h-4 w-4 mr-2 text-gray-500" />
										<span>{formatTime(booking.date)} ({booking.duration})</span>
									</div>
									<div className="flex items-center">
										<User className="h-4 w-4 mr-2 text-gray-500" />
										<span>{booking.teamMember}</span>
									</div>
									<div className="flex items-center">
										<MapPin className="h-4 w-4 mr-2 text-gray-500" />
										<span className="truncate">{booking.location}</span>
									</div>
								</div>
							</CardContent>

							<CardFooter className="flex justify-end space-x-2 pt-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => handleReschedule(booking)}
								>
									Reschedule
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => handleCancel(booking)}
								>
									Cancel
								</Button>
							</CardFooter>
						</Card>
					))}

					{mockUpcomingBookings.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500">You have no upcoming bookings.</p>
							<Button className="mt-4">Book a Service</Button>
						</div>
					)}
				</TabsContent>

				<TabsContent value="pending" className="space-y-4">
					<div className="text-center py-12">
						<p className="text-gray-500">You have no pending bookings.</p>
					</div>
				</TabsContent>
			</Tabs>

			{/* Reschedule Dialog */}
			<Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Reschedule Appointment</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{selectedBooking && (
							<div className="space-y-4">
								<div>
									<p className="font-medium">{selectedBooking.storeName}</p>
									<p className="text-sm text-gray-500">{selectedBooking.serviceType}</p>
								</div>

								<div className="space-y-2">
									<Label>Select a new date</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select date" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="2025-05-12">May 12, 2025</SelectItem>
											<SelectItem value="2025-05-13">May 13, 2025</SelectItem>
											<SelectItem value="2025-05-14">May 14, 2025</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>Select a new time</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select time" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="09:00">9:00 AM</SelectItem>
											<SelectItem value="10:00">10:00 AM</SelectItem>
											<SelectItem value="11:00">11:00 AM</SelectItem>
											<SelectItem value="13:00">1:00 PM</SelectItem>
											<SelectItem value="14:00">2:00 PM</SelectItem>
											<SelectItem value="15:00">3:00 PM</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>Reason for rescheduling (optional)</Label>
									<Textarea placeholder="Please provide a reason for rescheduling" />
								</div>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>Cancel</Button>
						<Button onClick={confirmReschedule}>Confirm Reschedule</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Cancel Dialog */}
			<Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Cancel Appointment</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{selectedBooking && (
							<div className="space-y-4">
								<p>Are you sure you want to cancel your appointment at <strong>{selectedBooking.storeName}</strong> on <strong>{formatDate(selectedBooking.date)}</strong> at <strong>{formatTime(selectedBooking.date)}</strong>?</p>

								<div className="space-y-2">
									<Label>Reason for cancellation (optional)</Label>
									<Textarea placeholder="Please provide a reason for cancellation" />
								</div>

								<p className="text-sm text-gray-500">Note: Cancellation policies may apply.</p>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsCancelOpen(false)}>Go Back</Button>
						<Button variant="destructive" onClick={confirmCancel}>Confirm Cancellation</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}