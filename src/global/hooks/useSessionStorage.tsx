import { useState } from 'react';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
	// Retrieve stored value or use initial value
	const getStoredValue = (): T => {
		const storedValue = sessionStorage.getItem(key);
		return storedValue ? JSON.parse(storedValue) : initialValue;
	};

	const [storedValue, setStoredValue] = useState<T>(getStoredValue);

	const setValue = (value: T) => {
		setStoredValue(value);
		sessionStorage.setItem(key, JSON.stringify(value));
	};

	return [storedValue, setValue];
}

export default useSessionStorage;