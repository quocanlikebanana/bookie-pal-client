import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { CreateCustomer, PostStoresByStoreIdBookApiArg, Service, TeamMemberSmall } from '@/features/booking/apis/booking.api-gen';
import { useAppSelector } from '@/app/store/hooks';
import { authSelectors } from '@/features/auth/stores/authSlice';
import useGetStoreIdFromParams from '@/features/booking/hooks/useGetStoreIdFromParams';

interface BookingDataContextProps {
	service: Service | null;
	team: TeamMemberSmall | null;
	startTime: Date | null;
	getEndTime: () => Date | null;
	customer: CreateCustomer;
	comment: string;

	setService: (service: Service | null) => void;
	setTeam: (team: TeamMemberSmall | null) => void;
	setStartTime: (startTime: Date | null) => void;
	setCustomer: (customerInfo: CreateCustomer) => void;
	setComment: (comment: string) => void;
	getCreateBookParams: () => PostStoresByStoreIdBookApiArg;
	clearBookingData: () => void;
}

const BookingDataContext = createContext<BookingDataContextProps | undefined>(undefined);

export const BookingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [bookingData, setBookingData] = useState<{
		service: Service | null;
		team: TeamMemberSmall | null;
		startTime: Date | null;
		customer: CreateCustomer;
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
					address: '',
				},
				comment: '',
			};
		}
		const parsedData = JSON.parse(savedData) as {
			service: Service | null;
			team: TeamMemberSmall | null;
			startTime: Date | null;
			customer: CreateCustomer;
			comment: string;
		};
		return {
			...parsedData,
			startTime: parsedData.startTime ? new Date(parsedData.startTime) : null,
		};
	});

	const storeId = useGetStoreIdFromParams();

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

	useEffect(() => {
		return () => {
			localStorage.removeItem('bookingData');
		}
	}, []);

	const getCreateBookParams = (): PostStoresByStoreIdBookApiArg => {
		if (
			!bookingData.service ||
			!bookingData.team ||
			!bookingData.startTime
		) {
			throw new Error('Missing required booking data');
		}
		const end = new Date(bookingData.startTime.getTime() + (bookingData.service?.duration || 0) * 60 * 1000);
		return {
			storeId: storeId,
			body: {
				serviceId: bookingData.service?.id || '',
				teamId: bookingData.team?.id || '',
				start: bookingData.startTime.toISOString(),
				end: end.toISOString(),
				comment: bookingData.comment,
				customer: {
					...bookingData.customer,
					accountId: isAuthenticated ? userInfo?.id : undefined,
				},
			}
		};
	}

	const clearBookingData = () => {
		setBookingData({
			service: null,
			team: null,
			startTime: null,
			customer: {
				email: '',
				name: '',
				phone: '',
			},
			comment: '',
		});
		localStorage.removeItem('bookingData');
	};


	return (
		<BookingDataContext.Provider
			value={{
				...bookingData,
				getEndTime: () => {
					if (!bookingData.startTime || !bookingData.service) return null;
					return new Date(bookingData.startTime.getTime() + (bookingData.service.duration || 0) * 60 * 1000);
				},
				setService: (service: Service | null) =>
					setBookingData((prev) => ({ ...prev, service })),
				setTeam: (team: TeamMemberSmall | null) =>
					setBookingData((prev) => ({ ...prev, team })),
				setStartTime: (startTime: Date | null) =>
					setBookingData((prev) => ({ ...prev, startTime })),
				setCustomer: (customerInfo: CreateCustomer) => {
					if (!isAuthenticated) {
						setBookingData((prev) => ({ ...prev, customer: customerInfo }));
					}
				},
				setComment: (comment: string) =>
					setBookingData((prev) => ({ ...prev, comment })),
				getCreateBookParams,
				clearBookingData,
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