import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REST_URL } from "@env";
import type { fetcheddata_schema } from "../screens/HomeScreen";

const day_in_seconds = 60 * 60 * 24;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: REST_URL }),
  endpoints: (builder) => ({
    getFactoryEquipmentsData: builder.query<Array<fetcheddata_schema>, void>({
      query: () => ({
        url: "",
        method: "GET",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      keepUnusedDataFor: day_in_seconds,
    }),
  }),
});

export const { useGetFactoryEquipmentsDataQuery } = apiSlice;
