const baseUrl = import.meta.env.VITE_BASE_URL;
const mock = import.meta.env.VITE_MOCK === 'true';
const defaultValue = {
	store: {
		avatar: "https://cdn-icons-png.flaticon.com/512/4320/4320289.png",
	}
}

export const env = {
	baseUrl,
	mock,
	defaultValues: defaultValue,
}