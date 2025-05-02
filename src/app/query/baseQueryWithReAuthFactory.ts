import { env } from '../env';
import { RootState } from '../store/store';
import { profileActions, profileSelectors } from '@/features/profile/stores/profileSlice';
import { profileGenApi } from '@/features/profile/apis/profile.api-gen';
import { Mutex } from 'async-mutex';
import { MockQueryFn, MyBaseQueryFactory } from './types';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithAuthFactory: MyBaseQueryFactory = (url: string) => fetchBaseQuery({
	baseUrl: url,
	prepareHeaders: (headers, { getState, endpoint }) => {
		if (noAuthEndpoints.includes(endpoint)) {
			return headers;
		}
		const state = (getState() as RootState);
		const accessToken = profileSelectors.selectTokens(state)?.accessToken;
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});

const mutex = new Mutex();

export const baseQueryWithReAuthFactory: MyBaseQueryFactory = (url: string, mockQueryFn?: MockQueryFn) => async (args, api, extraOptions) => {
	if (env.mock === true && mockQueryFn) {
		const mocked = mockQueryFn(api.endpoint, args);
		if (mocked) {
			return mocked;
		}
	}

	// The base query function to be used for the request
	const myFetchBaseQuery = baseQueryWithAuthFactory(url);

	// Wait until the mutex is available without locking it
	await mutex.waitForUnlock();
	let result = await myFetchBaseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const state = (api.getState() as RootState);
				const refreshToken = profileSelectors.selectTokens(state)?.refreshToken;
				if (!refreshToken) {
					// No refresh token available, logout user
					api.dispatch(profileActions.logout());
					return result;
				}

				// Try to refresh the token (automatically set/delete credentials upon success/failure)
				const refreshResult = await api.dispatch(profileGenApi.endpoints.postRefresh.initiate({
					body: {
						refreshToken: refreshToken
					}
				}));

				if (refreshResult.data) {
					// Retry the original query with the new token
					result = await myFetchBaseQuery(args, api, extraOptions);
				}
			} finally {
				// Release mutex
				release();
			}
		} else {
			// Wait until the mutex is available without locking it
			await mutex.waitForUnlock();
			// Try the request again
			result = await myFetchBaseQuery(args, api, extraOptions);
		}
	}
	return result;
};

const noAuthEndpoints: string[] = [
	profileGenApi.endpoints.postLogin.name,
	profileGenApi.endpoints.postRegister.name,
	profileGenApi.endpoints.postRefresh.name,
];