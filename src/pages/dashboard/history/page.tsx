import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Star, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

// Mock data for booking history
// Will be replaced with API call
const mockPastBookings = [
	{
		id: '101',
		storeName: 'Urban Cuts Barbershop',
		serviceType: 'Beard Trim',
		date: '2025-03-10T11:30:00',
		teamMember: 'Alex Johnson',
		duration: '30 min',
		status: 'completed',
		location: '123 Main St, New York, NY',
		amount: 25.00,
		hasReview: false
	},
	{
		id: '102',
		storeName: 'Zen Spa & Wellness',
		serviceType: 'Deep Tissue Massage',
		date: '2025-02-22T15:00:00',
		teamMember: 'Sarah Williams',
		duration: '60 min',
		status: 'completed',
		location: '456 Park Ave, New York, NY',
		amount: 85.00,
		hasReview: true,
		rating: 5
	},
	{
		id: '103',
		storeName: 'Beauty Corner',
		serviceType: 'Manicure & Pedicure',
		date: '2025-01-30T13:00:00',
		teamMember: 'Emily Chen',
		duration: '90 min',
		status: 'cancelled',
		location: '789 Broadway, New York, NY',
		amount: 0.00,
		hasReview: false
	}
];

export default function HistoryPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [timeFilter, setTimeFilter] = useState('all');
	const [sortOrder, setSortOrder] = useState('newest');
	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [isRebookOpen, setIsRebookOpen] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<any>(null);
	const [rating, setRating] = useState(0);
	const [reviewText, setReviewText] = useState('');

	const handleAddReview = (booking: any) => {
		setSelectedBooking(booking);
		setRating(0);
		setReviewText('');
		setIsReviewOpen(true);
	};

	const handleRebook = (booking: any) => {
		setSelectedBooking(booking);
		setIsRebookOpen(true);
	};

	const submitReview = () => {
		// Will implement API call to submit review
		setIsReviewOpen(false);
	};

	const confirmRebook = () => {
		// Will implement API call to rebook the service
		setIsRebookOpen(false);
	};

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
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

	// Filter bookings based on search and time filter
	const filteredBookings = mockPastBookings.filter(booking => {
		const matchesSearch =
			booking.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
			booking.teamMember.toLowerCase().includes(searchQuery.toLowerCase());

		if (timeFilter === 'all') return matchesSearch;
		if (timeFilter === 'lastMonth') {
			const oneMonthAgo = new Date();
			oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
			return matchesSearch && new Date(booking.date) > oneMonthAgo;
		}
		if (timeFilter === 'last3Months') {
			const threeMonthsAgo = new Date();
			threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
			return matchesSearch && new Date(booking.date) > threeMonthsAgo;
		}
		if (timeFilter === 'lastYear') {
			const oneYearAgo = new Date();
			oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
			return matchesSearch && new Date(booking.date) > oneYearAgo;
		}
		return matchesSearch;
	});

	// Sort bookings
	const sortedBookings = [...filteredBookings].sort((a, b) => {
		if (sortOrder === 'newest') {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		} else {
			return new Date(a.date).getTime() - new Date(b.date).getTime();
		}
	});

	const StarRating = ({ value, onChange }: { value: number, onChange: (value: number) => void }) => {
		return (
			<div className="flex space-x-1">
				{[1, 2, 3, 4, 5].map((star) => (
					<button
						key={star}
						type="button"
						onClick={() => onChange(star)}
						className="focus:outline-none"
					>
						<Star
							className={`h-6 w-6 ${star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
								}`}
						/>
					</button>
				))}
			</div>
		);
	};

	return (
		<div>
			<h2 className="text-2xl font-bold mb-6">Booking History</h2>

			<div className="mb-6 space-y-4">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1">
						<Input
							placeholder="Search by store, service, or team member"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full"
						/>
					</div>

					<div className="sm:w-48">
						<Select value={timeFilter} onValueChange={setTimeFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Time period" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All time</SelectItem>
								<SelectItem value="lastMonth">Last month</SelectItem>
								<SelectItem value="last3Months">Last 3 months</SelectItem>
								<SelectItem value="lastYear">Last year</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="sm:w-40">
						<Select value={sortOrder} onValueChange={setSortOrder}>
							<SelectTrigger>
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="newest">Newest first</SelectItem>
								<SelectItem value="oldest">Oldest first</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				{sortedBookings.length > 0 ? (
					sortedBookings.map(booking => (
						<Card key={booking.id} className={`overflow-hidden ${booking.status === 'cancelled' ? 'opacity-75' : ''}`}>
							<CardHeader className="pb-2">
								<div className="flex justify-between">
									<CardTitle>{booking.storeName}</CardTitle>
									<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'completed'
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'
										}`}>
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

								{booking.status === 'completed' && (
									<div className="mt-4 pt-4 border-t border-gray-100">
										<div className="flex items-center justify-between">
											<div className="text-sm">
												<span className="font-medium">Amount paid:</span> ${booking.amount.toFixed(2)}
											</div>
											{booking.hasReview && (
												<div className="flex items-center">
													<div className="flex">
														{[...Array(booking.rating)].map((_, i) => (
															<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
														))}
													</div>
													<span className="ml-1 text-sm text-gray-500">Your rating</span>
												</div>
											)}
										</div>
									</div>
								)}
							</CardContent>

							<CardFooter className="flex justify-end space-x-2 pt-2">
								{booking.status === 'completed' && !booking.hasReview && (
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleAddReview(booking)}
									>
										Add Review
									</Button>
								)}

								{booking.status === 'completed' && (
									<Button
										variant="default"
										size="sm"
										onClick={() => handleRebook(booking)}
									>
										Book Again
									</Button>
								)}
							</CardFooter>
						</Card>
					))
				) : (
					<div className="text-center py-12">
						<p className="text-gray-500">No booking history found.</p>
						<p className="text-gray-500 text-sm mt-2">Try adjusting your filters or make your first booking.</p>
					</div>
				)}
			</div>

			{/* Review Dialog */}
			<Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Write a Review</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{selectedBooking && (
							<div className="space-y-4">
								<div>
									<p className="font-medium">{selectedBooking.storeName}</p>
									<p className="text-sm text-gray-500">{selectedBooking.serviceType} with {selectedBooking.teamMember}</p>
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Your rating</label>
									<StarRating value={rating} onChange={setRating} />
								</div>

								<div className="space-y-2">
									<label className="text-sm font-medium">Your review (optional)</label>
									<textarea
										className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 text-sm"
										placeholder="Share your experience..."
										value={reviewText}
										onChange={(e) => setReviewText(e.target.value)}
									/>
								</div>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsReviewOpen(false)}>Cancel</Button>
						<Button onClick={submitReview} disabled={rating === 0}>Submit Review</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Rebook Dialog */}
			<Dialog open={isRebookOpen} onOpenChange={setIsRebookOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Book Again</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 py-4">
						{selectedBooking && (
							<div className="space-y-4">
								<div>
									<p className="font-medium">{selectedBooking.storeName}</p>
									<p className="text-sm text-gray-500">{selectedBooking.serviceType}</p>
								</div>

								<p>Would you like to book the same service again?</p>

								<div className="space-y-2">
									<div className="flex items-center">
										<Calendar className="h-4 w-4 mr-2 text-gray-500" />
										<span>{formatDate(selectedBooking.date)}</span>
									</div>
									<div className="flex items-center">
										<Clock className="h-4 w-4 mr-2 text-gray-500" />
										<span>{formatTime(selectedBooking.date)} ({selectedBooking.duration})</span>
									</div>
									<div className="flex items-center">
										<User className="h-4 w-4 mr-2 text-gray-500" />
										<span>{selectedBooking.teamMember}</span>
									</div>
								</div>

								<p className="text-sm text-gray-500">You'll be taken to the booking page to select a new date and time.</p>
							</div>
						)}
					</div>

					<DialogFooter>
						<Button variant="outline" onClick={() => setIsRebookOpen(false)}>Cancel</Button>
						<Button onClick={confirmRebook}>Continue to Booking</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}