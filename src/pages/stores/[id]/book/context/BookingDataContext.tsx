import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Service, TeamMemberSmall } from '@/features/store/apis/store.api-gen';
import { useAppSelector } from '@/app/store/hooks';
import { authSelectors } from '@/features/auth/stores/authSlice';

interface CustomerInfo {
	email: string;
	name: string;
	phone: string;
}

interface BookingDataContextProps {
	service: Service | null;
	team: TeamMemberSmall | null;
	startTime: Date | null;
	customer: CustomerInfo;
	comment: string;

	setService: (service: Service | null) => void;
	setTeam: (team: TeamMemberSmall | null) => void;
	setStartTime: (startTime: Date | null) => void;
	setCustomer: (customerInfo: CustomerInfo) => void;
	setComment: (comment: string) => void;
}

const BookingDataContext = createContext<BookingDataContextProps | undefined>(undefined);

export const BookingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [bookingData, setBookingData] = useState<{
		service: Service | null;
		team: TeamMemberSmall | null;
		startTime: Date | null;
		customer: CustomerInfo;
		comment: string;
	}>(() => {
		const savedData = localStorage.getItem('bookingData');
		if (savedData == null) {
			return {
				service: null,
				team: null,
				startTime: null,
				customer: {
					email: '',
					name: '',
					phone: '',
				},
				comment: '',
			};
		}
		const parsedData = JSON.parse(savedData) as {
			service: Service | null;
			team: TeamMemberSmall | null;
			startTime: Date | null;
			customer: CustomerInfo;
			comment: string;
		};
		return {
			...parsedData,
			startTime: parsedData.startTime ? new Date(parsedData.startTime) : null,
		};
	});

	const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
	const userInfo = useAppSelector(authSelectors.seleteUser);

	useEffect(() => {
		if (isAuthenticated && userInfo) {
			setBookingData((prev) => ({
				...prev,
				customer: {
					email: userInfo.email,
					name: userInfo.name,
					phone: userInfo.phone,
				},
			}));
		}
	}, [isAuthenticated, userInfo]);

	useEffect(() => {
		localStorage.setItem('bookingData', JSON.stringify(bookingData));
	}, [bookingData]);

	return (
		<BookingDataContext.Provider
			value={{
				...bookingData,
				setService: (service: Service | null) =>
					setBookingData((prev) => ({ ...prev, service })),
				setTeam: (team: TeamMemberSmall | null) =>
					setBookingData((prev) => ({ ...prev, team })),
				setStartTime: (startTime: Date | null) =>
					setBookingData((prev) => ({ ...prev, startTime })),
				setCustomer: (customerInfo: CustomerInfo) => {
					if (!isAuthenticated) {
						setBookingData((prev) => ({ ...prev, customer: customerInfo }));
					}
				},
				setComment: (comment: string) =>
					setBookingData((prev) => ({ ...prev, comment })),
			}}
		>
			{children}
		</BookingDataContext.Provider>
	);
};

export const useBookingDataContext = (): BookingDataContextProps => {
	const context = useContext(BookingDataContext);
	if (!context) {
		throw new Error('useBookingData must be used within a BookingDataProvider');
	}
	return context;
};