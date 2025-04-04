const paths = {
	ROOT: '/',
	stores: {
		ROOT: '/stores',
		in: (storeId: string | number = ":storeId") => ({
			ROOT: `/stores/${storeId}`,
			BOOK: `/stores/${storeId}/book`,
		}),
	}
}

export default paths;