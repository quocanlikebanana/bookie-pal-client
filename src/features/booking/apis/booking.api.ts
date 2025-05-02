import { baseQueryWithReAuthFactory } from "@/app/query/baseQueryWithReAuthFactory";
import { createApi } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
	reducerPath: "bookingApi",
	baseQuery: baseQueryWithReAuthFactory("booking"),
	endpoints: () => ({}),
});

export const {

} = bookingApi;