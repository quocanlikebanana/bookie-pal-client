import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { profileGenApi } from "./profile.api-gen";
import { env } from "@/app/env";

const authBaseQuery = fetchBaseQuery({ baseUrl: env.baseUrl + "/auth" });

profileGenApi.enhanceEndpoints({
	endpoints: {
		postLogout: {
			queryFn: async (_, api, extraOptions, __) => {
				const result = await authBaseQuery({
					url: `/logout`,
					method: "POST",
				}, api, extraOptions);
				if (result.error) {
					return { error: result.error };
				}
				return {
					data: void 0 as any,
				}
			}
		}
	}
});