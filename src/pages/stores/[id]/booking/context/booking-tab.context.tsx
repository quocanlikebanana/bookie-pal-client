import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Tab = 'chooseService' | 'chooseTeam' | 'pickTime' | 'fillForm' | 'booked';

interface BookingTabContextType {
	currentTab: Tab;
	setCurrentTab: (tab: Tab) => void;
}

const BookingContext = createContext<BookingTabContextType | undefined>(undefined);

interface BookingTabProviderProps {
	children: ReactNode;
}

export const BookingTabProvider: React.FC<BookingTabProviderProps> = ({ children }) => {
	const [currentTab, setCurrentTab] = useState<Tab>(() => {
		const savedTab = localStorage.getItem('currentTab') as Tab;
		return savedTab ? savedTab : 'chooseService';
	});

	useEffect(() => {
		localStorage.setItem('currentTab', currentTab);
	}, [currentTab]);

	useEffect(() => {
		return () => {
			localStorage.removeItem('currentTab');
		}
	}, []);

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