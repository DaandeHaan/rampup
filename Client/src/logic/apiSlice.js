import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customFetchBaseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:3001/api" : "production_url",
    credentials: "include",
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
    const result = await customFetchBaseQuery(args, api, extraOptions);

    // Check authentication status and handle it
    if (result.error && result.error.status === 401) {
        window.location.href = "/auth/login";
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithAuthCheck,
    endpoints: (builder) => ({
        getData: builder.query({
            query: (url) => ({
                url, // Pass the dynamic URL here
                method: "GET",
            }),
        }),
    }),
});

export const { useGetDataQuery } = apiSlice;
