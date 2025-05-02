const baseUrl = import.meta.env.VITE_BASE_URL;
const mock = import.meta.env.VITE_MOCK === 'true';

export const env = {
	baseUrl,
	mock,
}