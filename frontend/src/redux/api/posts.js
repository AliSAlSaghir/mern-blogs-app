import { POSTS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation({
      query: newPost => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: newPost,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreatePostMutation } = postsApiSlice;
