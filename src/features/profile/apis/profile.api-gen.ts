import { profileApi as api } from "./profile.api";
const injectedRtkApi = api.injectEndpoints({
	endpoints: (build) => ({
		postLogin: build.mutation<PostLoginApiResponse, PostLoginApiArg>({
			query: (queryArg) => ({
				url: `/login`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		postRegister: build.mutation<PostRegisterApiResponse, PostRegisterApiArg>({
			query: (queryArg) => ({
				url: `/register`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		postLogout: build.mutation<PostLogoutApiResponse, PostLogoutApiArg>({
			query: () => ({ url: `/logout`, method: "POST" }),
		}),
		postRefresh: build.mutation<PostRefreshApiResponse, PostRefreshApiArg>({
			query: (queryArg) => ({
				url: `/refresh`,
				method: "POST",
				body: queryArg.body,
			}),
		}),
		getAccounts: build.query<GetAccountsApiResponse, GetAccountsApiArg>({
			query: (queryArg) => ({
				url: `/accounts`,
				params: {
					search: queryArg.search,
					role: queryArg.role,
					page: queryArg.page,
					limit: queryArg.limit,
				},
			}),
		}),
		getAccountsByAccountId: build.query<
			GetAccountsByAccountIdApiResponse,
			GetAccountsByAccountIdApiArg
		>({
			query: (queryArg) => ({ url: `/accounts/${queryArg.accountId}` }),
		}),
		getAccountsMany: build.query<
			GetAccountsManyApiResponse,
			GetAccountsManyApiArg
		>({
			query: (queryArg) => ({ url: `/accounts/many`, body: queryArg.body }),
		}),
	}),
	overrideExisting: false,
});
export { injectedRtkApi as profileGenApi };
export type PostLoginApiResponse = /** status 200 Successful login response */ {
	user: UserAuth;
	token: TokenAuth;
};
export type PostLoginApiArg = {
	body: {
		email: string;
		password: string;
	};
};
export type PostRegisterApiResponse =
  /** status 201 Successful login response */ {
	user: UserAuth;
	token: TokenAuth;
};
export type PostRegisterApiArg = {
	body: {
		email: string;
		password: string;
		name: string;
		phone: string;
	};
};
export type PostLogoutApiResponse = /** status 200 Successful logout */ {
	message?: string;
};
export type PostLogoutApiArg = void;
export type PostRefreshApiResponse =
  /** status 200 Token refreshed successfully */ {
	token: TokenAuth;
};
export type PostRefreshApiArg = {
	body: {
		refreshToken: string;
	};
};
export type GetAccountsApiResponse =
  /** status 200 User information retrieved successfully */ {
	pagination?: {
		/** Current page number, starts from 1 */
		currentPage: number;
		/** Limit number of items per page, starts from 1 */
		limit: number;
		/** Total number of items in the database */
		totalItems: number;
		/** Total number of pages, starts from 1 */
		totalPages: number;
	};
	/** List of user information */
	accounts?: User[];
};
export type GetAccountsApiArg = {
	/** Search by name */
	search?: string;
	/** Filter by role (1 - Client, 2 - CMS) */
	role?: 1 | 2;
	/** Page number for pagination */
	page?: number;
	/** Limit number of items per page */
	limit?: number;
};
export type GetAccountsByAccountIdApiResponse =
  /** status 200 User information retrieved successfully */ User;
export type GetAccountsByAccountIdApiArg = {
	/** Account ID of the user */
	accountId: string;
};
export type GetAccountsManyApiResponse =
  /** status 200 User information retrieved successfully */ User[];
export type GetAccountsManyApiArg = {
	body: {
		accountIds: string[];
	};
};
export type Role = 1 | 2;
export type UserAuth = {
	accountId: string;
	name: string;
	role: Role;
	phone: string;
	email: string;
	avatar?: string;
};
export type TokenAuth = {
	accessToken: string;
	refreshToken: string;
};
export type User = UserAuth & {
	/** Creation timestamp */
	createdAt: string;
	/** Last update timestamp */
	updatedAt: string;
};
export const {
	usePostLoginMutation,
	usePostRegisterMutation,
	usePostLogoutMutation,
	usePostRefreshMutation,
	useGetAccountsQuery,
	useGetAccountsByAccountIdQuery,
	useGetAccountsManyQuery,
} = injectedRtkApi;
