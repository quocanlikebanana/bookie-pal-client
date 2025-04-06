import { CreateBookingData } from '@/features/store/types/command';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Customer, Service, TeamMemberSmall } from '@/features/store/apis/store.api-gen';
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

	setService: React.Dispatch<React.SetStateAction<Service | null>>;
	setTeam: React.Dispatch<React.SetStateAction<TeamMemberSmall | null>>;
	setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
	setCustomer: (customerInfo: CustomerInfo) => void;
	setComment: React.Dispatch<React.SetStateAction<string>>;
}

const BookingDataContext = createContext<BookingDataContextProps | undefined>(undefined);

export const BookingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [service, setService] = useState<Service | null>(null);
	const [team, setTeam] = useState<TeamMemberSmall | null>(null);
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [customer, setCustomer] = useState<CustomerInfo>({
		email: '',
		name: '',
		phone: ''
	});
	const [comment, setComment] = useState<string>('');
	const isAuthenticated = useAppSelector(authSelectors.selectIsAuthenticated);
	const userInfo = useAppSelector(authSelectors.seleteUser);

	useEffect(() => {
		if (isAuthenticated && userInfo) {
			setCustomer({
				email: userInfo.email,
				name: userInfo.name,
				phone: userInfo.phone
			});
		}
	}, [isAuthenticated, userInfo]);


	return (
		<BookingDataContext.Provider value={{
			service,
			team,
			startTime,
			customer,
			comment,
			setService,
			setTeam,
			setStartTime,
			setCustomer: (customerInfo: CustomerInfo) => {
				if (isAuthenticated == false) {
					setCustomer(customerInfo);
				}
			},
			setComment
		}}>
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