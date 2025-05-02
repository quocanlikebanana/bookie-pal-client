const paths = {
	ROOT: '/',
	stores: {
		ROOT: '/stores',
		in: (storeId: string | number = ":storeId") => ({
			ROOT: `/stores/${storeId}`,
			BOOK: `/stores/${storeId}/book`,
		}),
	},
	auth: {
		ROOT: '/auth/',
		LOGIN: '/auth/login/',
		REGISTER: '/auth/register/'
	},
}

export { paths };