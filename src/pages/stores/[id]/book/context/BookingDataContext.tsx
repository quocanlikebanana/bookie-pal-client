import { CreateBookingData } from '@/features/store/types/command';
import React, { createContext, useContext, ReactNode, useReducer } from 'react';
import bookingDataReducer, { BookingDataAction } from './BookingDataReducer';

const initialBookingData: CreateBookingData = {
	serviceId: null,
	teamId: null,
	startTime: null,
	endTime: null,
	comment: null,
	customer: null,
};

interface BookingDataContextProps {
	bookingData: CreateBookingData;
	dispatch: React.ActionDispatch<[action: BookingDataAction]>;
}

const BookingDataContext = createContext<BookingDataContextProps | undefined>(undefined);

export const BookingDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [bookingData, dispatch] = useReducer(bookingDataReducer, initialBookingData)

	return (
		<BookingDataContext.Provider value={{ bookingData, dispatch }}>
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