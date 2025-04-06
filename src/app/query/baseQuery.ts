import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import { env } from '../env';
import mockBasedOnUrl from './mockBasedOnUrl';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args, api, extraOptions) => {
	const url = typeof args === 'string' ? args : args.url;
	const mock = mockBasedOnUrl(url);
	if (mock) {
		return mock;
	}
	const fetch = fetchBaseQuery({
		baseUrl: env.backendUrl,
	})(args, api, extraOptions);
	return fetch;
};

export default baseQuery;