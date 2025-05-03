import { bookingApi as api } from "./booking.api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAccountByAccountIdStores: build.query<
      GetAccountByAccountIdStoresApiResponse,
      GetAccountByAccountIdStoresApiArg
    >({
      query: (queryArg) => ({
        url: `/account/${queryArg.accountId}/stores`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
        },
      }),
    }),
    getStores: build.query<GetStoresApiResponse, GetStoresApiArg>({
      query: (queryArg) => ({
        url: `/stores`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
        },
      }),
    }),
    postStores: build.mutation<PostStoresApiResponse, PostStoresApiArg>({
      query: (queryArg) => ({
        url: `/stores`,
        method: "POST",
        body: queryArg.store,
      }),
    }),
    getStoresByStoreId: build.query<
      GetStoresByStoreIdApiResponse,
      GetStoresByStoreIdApiArg
    >({
      query: (queryArg) => ({ url: `/stores/${queryArg.storeId}` }),
    }),
    getStoresByStoreIdAvailability: build.query<
      GetStoresByStoreIdAvailabilityApiResponse,
      GetStoresByStoreIdAvailabilityApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/availability`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getStoresByStoreIdBooked: build.query<
      GetStoresByStoreIdBookedApiResponse,
      GetStoresByStoreIdBookedApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/booked`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    postStoresByStoreIdBook: build.mutation<
      PostStoresByStoreIdBookApiResponse,
      PostStoresByStoreIdBookApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/book`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getStoresByStoreIdServices: build.query<
      GetStoresByStoreIdServicesApiResponse,
      GetStoresByStoreIdServicesApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/services`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    getStoresByStoreIdV2Teams: build.query<
      GetStoresByStoreIdV2TeamsApiResponse,
      GetStoresByStoreIdV2TeamsApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/v2/teams`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    getStoresByStoreIdV2Customers: build.query<
      GetStoresByStoreIdV2CustomersApiResponse,
      GetStoresByStoreIdV2CustomersApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/v2/customers`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    getStoresByStoreIdCustomersAndAccountId: build.query<
      GetStoresByStoreIdCustomersAndAccountIdApiResponse,
      GetStoresByStoreIdCustomersAndAccountIdApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/customers/${queryArg.accountId}`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    getStoresByStoreIdAnonymousCustomers: build.query<
      GetStoresByStoreIdAnonymousCustomersApiResponse,
      GetStoresByStoreIdAnonymousCustomersApiArg
    >({
      query: (queryArg) => ({
        url: `/stores/${queryArg.storeId}/anonymous-customers`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    postTeams: build.mutation<PostTeamsApiResponse, PostTeamsApiArg>({
      query: (queryArg) => ({
        url: `/teams`,
        method: "POST",
        body: queryArg.createTeam,
      }),
    }),
    getTeamsByTeamId: build.query<
      GetTeamsByTeamIdApiResponse,
      GetTeamsByTeamIdApiArg
    >({
      query: (queryArg) => ({ url: `/teams/${queryArg.teamId}` }),
    }),
    deleteTeamsByTeamId: build.mutation<
      DeleteTeamsByTeamIdApiResponse,
      DeleteTeamsByTeamIdApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}`,
        method: "DELETE",
      }),
    }),
    patchTeamsByTeamIdRole: build.mutation<
      PatchTeamsByTeamIdRoleApiResponse,
      PatchTeamsByTeamIdRoleApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/role`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    patchTeamsByTeamIdWorkHours: build.mutation<
      PatchTeamsByTeamIdWorkHoursApiResponse,
      PatchTeamsByTeamIdWorkHoursApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/work-hours`,
        method: "PATCH",
        body: queryArg.workHoursInWeek,
      }),
    }),
    getTeamsByTeamIdTimeOff: build.query<
      GetTeamsByTeamIdTimeOffApiResponse,
      GetTeamsByTeamIdTimeOffApiArg
    >({
      query: (queryArg) => ({ url: `/teams/${queryArg.teamId}/time-off` }),
    }),
    postTeamsByTeamIdTimeOff: build.mutation<
      PostTeamsByTeamIdTimeOffApiResponse,
      PostTeamsByTeamIdTimeOffApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/time-off`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deleteTeamsByTeamIdTimeOff: build.mutation<
      DeleteTeamsByTeamIdTimeOffApiResponse,
      DeleteTeamsByTeamIdTimeOffApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/time-off`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    getTeamsByTeamIdAvailability: build.query<
      GetTeamsByTeamIdAvailabilityApiResponse,
      GetTeamsByTeamIdAvailabilityApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/availability`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getTeamsByTeamIdBooked: build.query<
      GetTeamsByTeamIdBookedApiResponse,
      GetTeamsByTeamIdBookedApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/booked`,
        params: {
          start: queryArg.start,
          end: queryArg.end,
        },
      }),
    }),
    getTeamsByTeamIdServices: build.query<
      GetTeamsByTeamIdServicesApiResponse,
      GetTeamsByTeamIdServicesApiArg
    >({
      query: (queryArg) => ({ url: `/teams/${queryArg.teamId}/services` }),
    }),
    postServices: build.mutation<PostServicesApiResponse, PostServicesApiArg>({
      query: (queryArg) => ({
        url: `/services`,
        method: "POST",
        body: queryArg.createService,
      }),
    }),
    getServicesByServiceId: build.query<
      GetServicesByServiceIdApiResponse,
      GetServicesByServiceIdApiArg
    >({
      query: (queryArg) => ({ url: `/services/${queryArg.serviceId}` }),
    }),
    putServicesByServiceId: build.mutation<
      PutServicesByServiceIdApiResponse,
      PutServicesByServiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/services/${queryArg.serviceId}`,
        method: "PUT",
        body: queryArg.createService,
      }),
    }),
    deleteServicesByServiceId: build.mutation<
      DeleteServicesByServiceIdApiResponse,
      DeleteServicesByServiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/services/${queryArg.serviceId}`,
        method: "DELETE",
      }),
    }),
    getServicesByServiceIdTeams: build.query<
      GetServicesByServiceIdTeamsApiResponse,
      GetServicesByServiceIdTeamsApiArg
    >({
      query: (queryArg) => ({
        url: `/services/${queryArg.serviceId}/teams`,
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
        },
      }),
    }),
    postAnonymousCustomers: build.mutation<
      PostAnonymousCustomersApiResponse,
      PostAnonymousCustomersApiArg
    >({
      query: (queryArg) => ({
        url: `/anonymous-customers`,
        method: "POST",
        body: queryArg.createCustomer,
      }),
    }),
    getIndustries: build.query<GetIndustriesApiResponse, GetIndustriesApiArg>({
      query: () => ({ url: `/industries` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as bookingGenApi };
export type GetAccountByAccountIdStoresApiResponse = /** status 200 OK */ {
  pagination: Pagination;
  stores: Store[];
};
export type GetAccountByAccountIdStoresApiArg = {
  /** Id of the account */
  accountId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
};
export type GetStoresApiResponse = /** status 200 OK */ {
  pagination: {
    /** Current page number, starts from 1 */
    currentPage: number;
    /** Limit number of items per page, starts from 1 */
    limit: number;
    /** Total number of items in the database */
    totalItems: number;
    /** Total number of pages, starts from 1 */
    totalPages: number;
  };
  stores: Store[];
};
export type GetStoresApiArg = {
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
};
export type PostStoresApiResponse = unknown;
export type PostStoresApiArg = {
  store: Store;
};
export type GetStoresByStoreIdApiResponse = /** status 200 OK */ Store;
export type GetStoresByStoreIdApiArg = {
  /** Id of the store */
  storeId: Id;
};
export type GetStoresByStoreIdAvailabilityApiResponse =
  /** status 200 OK */ Availability;
export type GetStoresByStoreIdAvailabilityApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type GetStoresByStoreIdBookedApiResponse = /** status 200 OK */ Book[];
export type GetStoresByStoreIdBookedApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type PostStoresByStoreIdBookApiResponse = unknown;
export type PostStoresByStoreIdBookApiArg = {
  /** Id of the store */
  storeId: Id;
  body: {
    teamId: Id;
    serviceId: Id;
    start: DateTime;
    end: DateTime;
    /** Comment for the service */
    comment?: string;
    customer: CreateCustomer;
  };
};
export type GetStoresByStoreIdServicesApiResponse = /** status 200 OK */ {
  pagination: Pagination;
  services: Service[];
};
export type GetStoresByStoreIdServicesApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
  /** Search string for filtering */
  search?: string;
};
export type GetStoresByStoreIdV2TeamsApiResponse = /** status 200 OK */ {
  pagination: Pagination;
  teams: Team[];
};
export type GetStoresByStoreIdV2TeamsApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
  /** Search string for filtering */
  search?: string;
};
export type GetStoresByStoreIdV2CustomersApiResponse = /** status 200 OK */ {
  pagination: Pagination;
  customers: Id[];
};
export type GetStoresByStoreIdV2CustomersApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
  /** Search string for filtering */
  search?: string;
};
export type GetStoresByStoreIdCustomersAndAccountIdApiResponse =
  /** status 200 OK */ {
    pagination: Pagination;
    customers: Customer[];
  };
export type GetStoresByStoreIdCustomersAndAccountIdApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Id of the account */
  accountId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
  /** Search string for filtering */
  search?: string;
};
export type GetStoresByStoreIdAnonymousCustomersApiResponse =
  /** status 200 OK */ {
    pagination: Pagination;
    customers: Customer[];
  };
export type GetStoresByStoreIdAnonymousCustomersApiArg = {
  /** Id of the store */
  storeId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
  /** Search string for filtering */
  search?: string;
};
export type PostTeamsApiResponse = unknown;
export type PostTeamsApiArg = {
  createTeam: CreateTeam;
};
export type GetTeamsByTeamIdApiResponse = /** status 200 OK */ Team;
export type GetTeamsByTeamIdApiArg = {
  /** Id of a team member */
  teamId: Id;
};
export type DeleteTeamsByTeamIdApiResponse = unknown;
export type DeleteTeamsByTeamIdApiArg = {
  /** Id of a team member */
  teamId: Id;
};
export type PatchTeamsByTeamIdRoleApiResponse = unknown;
export type PatchTeamsByTeamIdRoleApiArg = {
  /** Id of a team member */
  teamId: Id;
  body: {
    role: CmsRole;
  };
};
export type PatchTeamsByTeamIdWorkHoursApiResponse = unknown;
export type PatchTeamsByTeamIdWorkHoursApiArg = {
  /** Id of a team member */
  teamId: Id;
  workHoursInWeek: WorkHoursInWeek;
};
export type GetTeamsByTeamIdTimeOffApiResponse = /** status 200 OK */ {
  /** Start date of the time off */
  fromDate: DateTime;
  /** End date of the time off */
  toDate: DateTime;
}[];
export type GetTeamsByTeamIdTimeOffApiArg = {
  /** Id of a team member */
  teamId: Id;
};
export type PostTeamsByTeamIdTimeOffApiResponse = unknown;
export type PostTeamsByTeamIdTimeOffApiArg = {
  /** Id of a team member */
  teamId: Id;
  body: {
    fromDate?: DateTime;
    toDate?: DateTime;
  };
};
export type DeleteTeamsByTeamIdTimeOffApiResponse = unknown;
export type DeleteTeamsByTeamIdTimeOffApiArg = {
  /** Id of a team member */
  teamId: Id;
  body: {
    /** Id of the time off to be deleted of the team */
    teamTimeOffId: Id;
  };
};
export type GetTeamsByTeamIdAvailabilityApiResponse =
  /** status 200 OK */ Availability;
export type GetTeamsByTeamIdAvailabilityApiArg = {
  /** Id of a team member */
  teamId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type GetTeamsByTeamIdBookedApiResponse = /** status 200 OK */ Book[];
export type GetTeamsByTeamIdBookedApiArg = {
  /** Id of a team member */
  teamId: Id;
  /** Start of the time range in date time */
  start: string;
  /** End of the time range in date time */
  end: string;
};
export type GetTeamsByTeamIdServicesApiResponse =
  /** status 200 OK */ Service[];
export type GetTeamsByTeamIdServicesApiArg = {
  /** Id of a team member */
  teamId: Id;
};
export type PostServicesApiResponse = unknown;
export type PostServicesApiArg = {
  createService: CreateService;
};
export type GetServicesByServiceIdApiResponse = /** status 200 OK */ Service;
export type GetServicesByServiceIdApiArg = {
  /** Id of the service */
  serviceId: Id;
};
export type PutServicesByServiceIdApiResponse = unknown;
export type PutServicesByServiceIdApiArg = {
  /** Id of the service */
  serviceId: Id;
  createService: CreateService;
};
export type DeleteServicesByServiceIdApiResponse = unknown;
export type DeleteServicesByServiceIdApiArg = {
  /** Id of the service */
  serviceId: Id;
};
export type GetServicesByServiceIdTeamsApiResponse = /** status 200 OK */ {
  pagination?: Pagination;
  teams?: Team[];
};
export type GetServicesByServiceIdTeamsApiArg = {
  /** Id of the service */
  serviceId: Id;
  /** Page number for pagination */
  page?: number;
  /** Limit number of items per page */
  limit?: number;
  /** Search string for filtering */
  search?: string;
};
export type PostAnonymousCustomersApiResponse = unknown;
export type PostAnonymousCustomersApiArg = {
  createCustomer: CreateCustomer;
};
export type GetIndustriesApiResponse = /** status 200 OK */ string[];
export type GetIndustriesApiArg = void;
export type Pagination = {
  /** Current page number, starts from 1 */
  currentPage: number;
  /** Limit number of items per page, starts from 1 */
  limit: number;
  /** Total number of items in the database */
  totalItems: number;
  /** Total number of pages, starts from 1 */
  totalPages: number;
};
export type Id = string;
export type Time = {
  /** Hour of the time (0-23) */
  hour: number;
  /** Minute of the time */
  minute: number;
};
export type TimeRange = {
  /** Start time */
  start: Time;
  /** End time */
  end: Time;
};
export type WorkHoursInWeek = {
  /** Day of the week (0-6) where 0 is Monday and 6 is Sunday. */
  dayOfWeek: number;
  /** Work hours of the team member in a day. */
  workHours: TimeRange[];
}[];
export type Store = {
  id: Id;
  /** Name of the store */
  name: string;
  /** Description of the store */
  description: string;
  /** Address of the store */
  address: string;
  /** Industry of the store */
  industry: string;
  /** Phone number of the store */
  phone: string;
  /** Timezone of the store */
  timezone: string;
  /** Avatar of the store */
  avatar?: string;
  workHours: WorkHoursInWeek;
};
export type Availability = TimeRange[][];
export type CmsRole = 1 | 2 | 3;
export type CreateTeam = {
  /** Id of the account */
  accountId: Id;
  /** Id of the store */
  storeId: Id;
  /** Name of the team member */
  name: string;
  /** Avatar of the team member */
  avatar?: string;
  role: CmsRole;
  workHours: WorkHoursInWeek;
};
export type Team = CreateTeam & {
  /** Id of the team member in Booking domain (not the account id). */
  id: Id;
};
export type Service = {
  /** Id of the service */
  id: Id;
  /** Id of the store */
  storeId: Id;
  /** Name of the service */
  name: string;
  /** Description of the service */
  description: string;
  /** Duration of the service in minutes. */
  duration: number;
  /** Team members who can provide the service */
  members: Team[];
  /** Category of the service */
  category: string;
  /** Avatar of the service */
  avatar?: string;
};
export type CreateCustomer = {
  /** Id of the customer account. This is optional and can be null if the customer is anonymous. */
  accountId?: Id;
  name: string;
  phone: string;
  email: string;
  address?: string;
  avatar?: string;
  /** Id of the store */
  storeId: Id;
};
export type Customer = CreateCustomer & {
  /** Id of the customer in Booking domain (not the account id). */
  id: Id;
};
export type BookingStatus = "new" | "ready" | "denined" | "done";
export type Book = {
  /** Id of the service */
  id: string;
  service: Service;
  customer: Customer;
  /** Start time of the service */
  start: string;
  /** End time of the service */
  end: string;
  /** Comment for the service */
  comment?: string;
  status: BookingStatus;
};
export type DateTime = string;
export type CreateService = {
  /** Id of the store */
  storeId?: Id;
  /** Name of the service */
  name: string;
  /** Description of the service */
  description: string;
  /** Duration of the service in minutes. */
  duration: number;
  /** Team members who can provide the service */
  members: Id[];
  /** Category of the service */
  category: string;
};
export const {
  useGetAccountByAccountIdStoresQuery,
  useGetStoresQuery,
  usePostStoresMutation,
  useGetStoresByStoreIdQuery,
  useGetStoresByStoreIdAvailabilityQuery,
  useGetStoresByStoreIdBookedQuery,
  usePostStoresByStoreIdBookMutation,
  useGetStoresByStoreIdServicesQuery,
  useGetStoresByStoreIdV2TeamsQuery,
  useGetStoresByStoreIdV2CustomersQuery,
  useGetStoresByStoreIdCustomersAndAccountIdQuery,
  useGetStoresByStoreIdAnonymousCustomersQuery,
  usePostTeamsMutation,
  useGetTeamsByTeamIdQuery,
  useDeleteTeamsByTeamIdMutation,
  usePatchTeamsByTeamIdRoleMutation,
  usePatchTeamsByTeamIdWorkHoursMutation,
  useGetTeamsByTeamIdTimeOffQuery,
  usePostTeamsByTeamIdTimeOffMutation,
  useDeleteTeamsByTeamIdTimeOffMutation,
  useGetTeamsByTeamIdAvailabilityQuery,
  useGetTeamsByTeamIdBookedQuery,
  useGetTeamsByTeamIdServicesQuery,
  usePostServicesMutation,
  useGetServicesByServiceIdQuery,
  usePutServicesByServiceIdMutation,
  useDeleteServicesByServiceIdMutation,
  useGetServicesByServiceIdTeamsQuery,
  usePostAnonymousCustomersMutation,
  useGetIndustriesQuery,
} = injectedRtkApi;
