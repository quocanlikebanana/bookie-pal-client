import React, { createContext, useContext, useState, ReactNode } from 'react';

type Tab = 'chooseService' | 'chooseTeam' | 'pickTime' | 'fillForm' | 'booked';

interface BookingTabContextType {
	currentTab: Tab;
	setCurrentTab: (tab: Tab) => void;
}

const BookingContext = createContext<BookingTabContextType | undefined>(undefined);

interface BookingTabProviderProps {
	children: ReactNode;
}

export const BookingTabProvider: React.FC<BookingTabProviderProps> = ({ children }) => {
	const [currentTab, setCurrentTab] = useState<Tab>('chooseService');

	return (
		<BookingContext.Provider value={{ currentTab, setCurrentTab }}>
			{children}
		</BookingContext.Provider>
	);
};

export const useBookingTabContext = (): BookingTabContextType => {
	const context = useContext(BookingContext);
	if (!context) {
		throw new Error('useBookingContext must be used within a BookingProvider');
	}
	return context;
};