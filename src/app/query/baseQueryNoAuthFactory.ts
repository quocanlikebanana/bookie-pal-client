import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyBaseQueryFactory, MockQueryFn } from "./types";
import { env } from "../env";

export const baseQueryNoAuthFactory: MyBaseQueryFactory = (url: string, mockQueryFn?: MockQueryFn) => async (args, api, extraOptions) => {
	if (env.mock === true && mockQueryFn) {
		const mocked = mockQueryFn(api.endpoint, args);
		if (mocked != null) {
			return mocked;
		}
	}
	const myFetchBaseQuery = fetchBaseQuery({
		baseUrl: url,
	});
	return myFetchBaseQuery(args, api, extraOptions);
}