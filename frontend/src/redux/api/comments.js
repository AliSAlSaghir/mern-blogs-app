import { COMMENTS_URL } from "../constants";
import apiSlice from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation({
      query: ({ postId, content }) => ({
        url: `${COMMENTS_URL}/${postId}`,
        method: "POST",
        body: { content },
        credentials: "include",
      }),
    }),
    getCommentsForPost: builder.query({
      query: postId => ({
        url: `${COMMENTS_URL}/${postId}`,
        credentials: "include",
      }),
    }),
    likeComment: builder.mutation({
      query: commentId => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
    editComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: "PUT",
        body: { content },
        credentials: "include",
      }),
    }),
    deleteComment: builder.mutation({
      query: commentId => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getComments: builder.query({
      query: (query = "") => ({
        url: `${COMMENTS_URL}${query}`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetCommentsForPostQuery,
  useLikeCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
} = commentsApiSlice;
