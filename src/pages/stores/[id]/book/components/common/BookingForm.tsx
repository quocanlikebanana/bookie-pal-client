import React, { useState } from 'react';
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

interface BookingFormProps {
	onSubmit: (formData: BookingFormData) => void;
}

interface BookingFormData {
	fullName: string;
	phoneCountryCode: string;
	phoneNumber: string;
	email: string;
	comments: string;
	emailReminder: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit }) => {
	const [formData, setFormData] = useState<BookingFormData>({
		fullName: 'An Ngo KG',
		phoneCountryCode: '+66',
		phoneNumber: '91 233 4456',
		email: 'ngakg2611@gmail.com',
		comments: '',
		emailReminder: true,
	});

	const handleChange = (field: keyof BookingFormData, value: string | boolean) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	// Country codes for the phone dropdown
	const countryCodes = [
		'+1', '+44', '+61', '+65', '+66', '+81', '+82', '+84', '+86', '+91'
	];

	return (
		<div className="bg-zinc-950 text-white p-6 rounded-lg max-w-md">
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Full Name */}
				<div className="space-y-1">
					<Label htmlFor="fullName" className="text-sm">
						Full Name <span className="text-red-500">*</span>
					</Label>
					<Input
						id="fullName"
						value={formData.fullName}
						onChange={(e) => handleChange('fullName', e.target.value)}
						className="bg-zinc-900 border-zinc-800 text-white"
						required
					/>
				</div>

				{/* Phone */}
				<div className="space-y-1">
					<Label htmlFor="phoneNumber" className="text-sm">
						Phone <span className="text-red-500">*</span>
					</Label>
					<div className="flex gap-2">
						<Select
							value={formData.phoneCountryCode}
							onValueChange={(value) => handleChange('phoneCountryCode', value)}
						>
							<SelectTrigger className="w-24 bg-zinc-900 border-zinc-800 text-white">
								<SelectValue placeholder="+1" />
							</SelectTrigger>
							<SelectContent className="bg-zinc-900 border-zinc-800 text-white">
								{countryCodes.map((code) => (
									<SelectItem key={code} value={code}>{code}</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Input
							id="phoneNumber"
							value={formData.phoneNumber}
							onChange={(e) => handleChange('phoneNumber', e.target.value)}
							className="flex-1 bg-zinc-900 border-zinc-800 text-white"
							required
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
						type="email"
						value={formData.email}
						onChange={(e) => handleChange('email', e.target.value)}
						className="bg-zinc-900 border-zinc-800 text-white"
						required
					/>
				</div>

				{/* Comments */}
				<div className="space-y-1">
					<Label htmlFor="comments" className="text-sm">
						Comments
					</Label>
					<Textarea
						id="comments"
						value={formData.comments}
						onChange={(e) => handleChange('comments', e.target.value)}
						className="bg-zinc-900 border-zinc-800 text-white h-20"
					/>
				</div>

				{/* Email Reminder Checkbox */}
				<div className="flex items-center gap-2 pt-2">
					<Checkbox
						id="emailReminder"
						checked={formData.emailReminder}
						onCheckedChange={(checked) => handleChange('emailReminder', Boolean(checked))}
						className="bg-zinc-900 border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black"
					/>
					<Label htmlFor="emailReminder" className="text-sm cursor-pointer">
						Get an email reminder for this booking
					</Label>
				</div>

				{/* Submit Button */}
				<div className="pt-2">
					<Button
						type="submit"
						className="bg-white text-black hover:bg-gray-200 rounded-full px-6"
					>
						Confirm
					</Button>
				</div>

				{/* Cancellation Policy */}
				<div className="bg-zinc-900 p-4 rounded-md space-y-4 mt-6">
					<div>
						<h3 className="text-sm font-medium">Cancellation policy:</h3>
						<p className="text-sm text-gray-400">
							You can cancel or reschedule anytime before the appointment time.
						</p>
					</div>

					<div>
						<h3 className="text-sm font-medium">Additional information:</h3>
						<p className="text-sm text-gray-400">
							When booking with Ango, you may receive appointment-specific communication from Setmore. This includes confirmations, receipts and reminders via email and SMS.
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default BookingForm;