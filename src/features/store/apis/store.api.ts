import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "../../../app/query/baseQuery";

export const storeApi = createApi({
	reducerPath: "storeApi",
	baseQuery: baseQuery,
	endpoints: () => ({
	}),
});

export const {

} = storeApi;