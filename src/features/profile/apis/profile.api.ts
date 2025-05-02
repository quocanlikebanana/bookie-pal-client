import { createApi } from "@reduxjs/toolkit/query/react";
import { env } from "@/app/env";
import { baseQueryNoAuthFactory } from "@/app/query/baseQueryNoAuthFactory";

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryNoAuthFactory(env.baseUrl + '/unauth'),
	endpoints: () => ({}),
});
