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
  }),
});

export const { useUpdateUserMutation } = usersApiSlice;
