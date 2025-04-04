import { Service } from '@/features/store/apis/store.api-gen';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingServiceInfoContextProps {
	selectedService: Service | null;
	setSelectedService: (service: Service) => void;
}

const BookingServiceInfoContext = createContext<BookingServiceInfoContextProps | undefined>(undefined);

export const BookingServiceInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedService, setSelectedService] = useState<Service | null>(null);

	return (
		<BookingServiceInfoContext.Provider value={{ selectedService, setSelectedService }}>
			{children}
		</BookingServiceInfoContext.Provider>
	);
};

export const useBookingServiceInfoContext = (): BookingServiceInfoContextProps => {
	const context = useContext(BookingServiceInfoContext);
	if (!context) {
		throw new Error('useBookingServiceInfo must be used within a BookingServiceInfoProvider');
	}
	return context;
};