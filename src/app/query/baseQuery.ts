import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import mockQueryFn from './mockQueryFn';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, unknown> = async (args) => {
	return mockQueryFn(args);
};

export default baseQuery;