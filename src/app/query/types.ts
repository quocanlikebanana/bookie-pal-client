import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type MyBaseQuery = BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{}
>;

export type MockQueryFn<TArgs = any, TResponse = any> = (endpointName: string, args?: TArgs) => { data: TResponse } | null;

export type MyBaseQueryFactory = (url: string, mockQueryFn?: MockQueryFn) => MyBaseQuery;