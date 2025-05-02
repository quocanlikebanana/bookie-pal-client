const paths = {
	ROOT: '/',
	stores: {
		ROOT: '/stores',
		in: (storeId: string | number = ":storeId") => ({
			ROOT: `/stores/${storeId}`,
			BOOKING: `/stores/${storeId}/booking`,
		}),
	},
	auth: {
		ROOT: '/auth/',
		LOGIN: '/auth/login/',
		REGISTER: '/auth/register/'
	},
}

export { paths };