import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const metaBaseQuery = fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL });

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await metaBaseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken: api.getState().auth.refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Floors", "Waiting", "Orders"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response, meta, arg) => {
        return {
          user: response,
          accessToken: meta.response.headers.get("Authorization"),
          refreshToken: meta.response.headers.get("RefreshToken"),
        };
      },
    }),
    getFloors: builder.query({
      query: (data) => ({
        url: "/floor/list",
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data,
      providesTags: ["Floors"],
    }),
    getOrderByTable: builder.query({
      query: (data) => ({
        url: "/order/list",
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data.content[0],
    }),
    getOrder: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      transformResponse: (response) => response.data,
    }),
    payOrder: builder.mutation({
      query: (data) => ({
        url: `/order/pay`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Stores"],
    }),
    getOrders: builder.query({
      query: (data) => ({
        url: "/order/list",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
      providesTags: ["Orders"],
    }),
    getFoodWaiting: builder.query({
      query: (data) => ({
        url: "/menu/food/list-waiting",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 5,
      providesTags: ["Waiting"],
    }),
    completeFood: builder.mutation({
      query: (data) => ({
        url: `/menu/food/complete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Waiting"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetFloorsQuery,
  useGetOrderByTableQuery,
  useGetOrderQuery,
  usePayOrderMutation,
  useGetOrdersQuery,
  useGetFoodWaitingQuery,
  useCompleteFoodMutation
} = apiSlice;
