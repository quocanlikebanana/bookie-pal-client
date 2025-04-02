import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../app/query/baseQuery";

export const industryApi = createApi({
	reducerPath: "industryApi",
	baseQuery: baseQuery,
	endpoints: (builder) => ({
		getIndustries: builder.query<string[], void>({
			query: () => ({
				url: "/industries",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useGetIndustriesQuery,
} = industryApi;