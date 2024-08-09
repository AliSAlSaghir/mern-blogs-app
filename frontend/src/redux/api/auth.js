import { AUTH_URL } from "../constants";
import apiSlice from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signup: builder.mutation({
      query: formData => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const { useSignupMutation } = authApiSlice;
