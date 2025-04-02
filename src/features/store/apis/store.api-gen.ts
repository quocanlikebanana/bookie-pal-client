import { storeApi as api } from "./store.api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		getIndustries: build.query<GetIndustriesApiResponse, GetIndustriesApiArg>({
			query: () => ({ url: `/industries` }),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as storeGenApi };
export type GetIndustriesApiResponse =
  /** status 200 A list of industries */ string[];
export type GetIndustriesApiArg = void;
export const { useGetIndustriesQuery } = injectedRtkApi;
