import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { usePostStoresByStoreIdBookMutation } from '@/features/booking/apis/booking.api-gen';
import { useBookingTabContext } from '../../context/booking-tab.context';
import { profileSelectors } from '@/features/profile/stores/profileSlice';
import bookingSlice from '@/features/booking/stores/booking/bookingSlice';

// TODO: Country codes
const countryCodes = [
	'+1', '+44', '+61', '+65', '+66', '+81', '+82', '+84', '+86', '+91'
];

const FillFormTab: React.FC = () => {
	const dispatch = useAppDispatch();
	const customer = useAppSelector(bookingSlice.selectors.selectCustomer);
	const comment = useAppSelector(bookingSlice.selectors.selectComment);
	const isAuthenticated = useAppSelector(profileSelectors.selectIsAuthenticated);

	const { setCurrentTab } = useBookingTabContext();

	const [book, { isSuccess }] = usePostStoresByStoreIdBookMutation();

	useEffect(() => {
		if (isSuccess) {
			setCurrentTab("booked");
		}
	}, [isSuccess]);

	const handleCustomerInfoChange = (field: "name" | "email" | "phone", value: string) => {
		dispatch(bookingSlice.actions.setCustomer({
			...customer,
			[field]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const bookData = useAppSelector(bookingSlice.selectors.selectBookingData);
		// TODO: Validate booking data (show errors)
		if (!bookData) return;
		book(bookData);
	};

	return (
		<div className="bg-zinc-50 p-6 rounded-lg w-full grid grid-cols-2 gap-4">
			<form id='bookingForm' onSubmit={handleSubmit} className="space-y-4">
				{/* Full Name */}
				<div className="space-y-1">
					<Label htmlFor="fullName" className="text-sm">
						Full Name <span className="text-red-500">*</span>
					</Label>
					<Input
						id="fullName"
						disabled={isAuthenticated}
						value={customer.name}
						onChange={(e) => handleCustomerInfoChange("name", e.target.value)}
						className="bg-zinc-100 border-zinc-200"
						required
						placeholder='Enter your full name'
					/>
				</div>

				{/* Phone */}
				<div className="space-y-1">
					<Label htmlFor="phoneNumber" className="text-sm">
						Phone <span className="text-red-500">*</span>
					</Label>
					<div className="flex gap-2">
						{/* TODO: Phone zone code */}
						<Select
							disabled={isAuthenticated}
							defaultValue='+1'
						>
							<SelectTrigger className="w-24 bg-zinc-100 border-zinc-200">
								<SelectValue placeholder="+1" />
							</SelectTrigger>
							<SelectContent className="bg-zinc-100 border-zinc-200">
								{countryCodes.map((code) => (
									<SelectItem key={code} value={code}>{code}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							id="phoneNumber"
							disabled={isAuthenticated}
							value={customer.phone}
							onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
							className="flex-1 bg-zinc-100 border-zinc-200"
							required
							placeholder='Phone Number'
						/>
					</div>
				</div>

				{/* Email */}
				<div className="space-y-1">
					<Label htmlFor="email" className="text-sm">
						Email <span className="text-red-500">*</span>
					</Label>
					<Input
						id="email"
						disabled={isAuthenticated}
						type="email"
						value={customer.email}
						onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
						className="bg-zinc-100 border-zinc-200"
						required
						placeholder='Enter your email'
					/>
				</div>
			</form>

			{/* Cancellation Policy */}
			<div className="bg-zinc-100 p-4 rounded-md space-y-4 mt-6">
				<div>
					<h3 className="text-sm font-medium">Cancellation policy:</h3>
					<p className="text-sm text-gray-600">
						You can cancel or reschedule anytime before the appointment time.
					</p>
				</div>

				<div>
					<h3 className="text-sm font-medium">Additional information:</h3>
					<p className="text-sm text-gray-600">
						When booking with Ango, you may receive appointment-specific communication from Setmore. This includes confirmations, receipts and reminders via email and SMS.
					</p>
				</div>
			</div>

			{/* Submit Section */}

			<div className='col-span-2 mt-6'>
				{/* Comments */}
				<div className="space-y-1">
					<Label htmlFor="comments" className="text-sm">
						Comments
					</Label>
					<Textarea
						id="comments"
						value={comment}
						onChange={(e) => dispatch(bookingSlice.actions.setComment(e.target.value))}
						className="bg-zinc-100 border-zinc-200 h-20"
						placeholder='Enter any comments or special requests'
					/>
				</div>

				<div className='flex w-full justify-between items-center mt-4'>
					{/* TODO: Reminder Checkbox */}
					<div className="flex items-center gap-2 pt-2">
						<Checkbox
							id="emailReminder"
							className="bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200 focus:ring-2 focus:ring-zinc-500"
						/>
						<Label htmlFor="emailReminder" className="text-sm cursor-pointer">
							Get an email reminder for this booking
						</Label>
					</div>

					{/* Submit Button */}
					<div className="pt-2">
						<Button
							type="submit"
							form='bookingForm'
							className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
						>
							Confirm
						</Button>
					</div>
				</div>
			</div>

		</div>
	);
};

export default FillFormTab;