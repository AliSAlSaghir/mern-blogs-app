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
    signin: builder.mutation({
      query: formData => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
    googleAuth: builder.mutation({
      query: formData => ({
        url: `${AUTH_URL}/google-auth`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/sign-out`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useGoogleAuthMutation,
  useSignoutMutation,
} = authApiSlice;
