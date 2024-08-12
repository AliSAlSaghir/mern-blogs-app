import { POSTS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: (query = "") => ({
        url: `${POSTS_URL}${query}`,
        credentials: "include",
      }),
    }),
    createPost: builder.mutation({
      query: newPost => ({
        url: `${POSTS_URL}`,
        method: "POST",
        body: newPost,
        credentials: "include",
      }),
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `${POSTS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, post }) => ({
        url: `${POSTS_URL}/${id}`,
        method: "PUT",
        body: post,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postsApiSlice;
