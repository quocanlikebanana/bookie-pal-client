import { industries } from "@/mocks/industries";
import { FetchArgs } from "@reduxjs/toolkit/query";

type MockData = {
	[key: string]: any;
};

const mockData: MockData = {
	"/industries": industries
};

const mockQueryFn = async (args: string | FetchArgs) => {
	const url = typeof args === 'string' ? args : args.url;

	if (mockData[url]) {
		return { data: mockData[url] };
	}

	return {
		error: {
			status: 404,
			data: 'Not Found',
		},
	};
};

export default mockQueryFn;