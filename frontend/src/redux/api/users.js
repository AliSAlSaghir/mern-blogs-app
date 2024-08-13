import { USERS_URL } from "../constants";
import apiSlice from "./apiSlice";
const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    updateUser: builder.mutation({
      query: ({ user, id }) => ({
        url: `${USERS_URL}/${id}`,
        method: "PUT",
        body: user,
        credentials: "include",
      }),
    }),
    deleteMe: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/DeleteMe`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUsers: builder.query({
      query: (query = "") => ({
        url: `${USERS_URL}/${query}`,
        credentials: "include",
      }),
    }),
    getUser: builder.query({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useDeleteMeMutation,
  useDeleteUserMutation,
  useLazyGetUsersQuery,
  useLazyGetUserQuery,
} = usersApiSlice;
