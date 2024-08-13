import catchAsync from "../utils/catchAsync.js";
import errorHandler from "../utils/error.js";
import Comment from "../models/commentModel.js";

export const createComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const { postId } = req.params;
  const newComment = new Comment({
    content,
    postId,
    userId: req.user._id,
  });
  await newComment.save();
  res.status(200).json(newComment);
});

export const getCommentsForPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
  res.status(200).json(comments);
});

export const likeComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return next(errorHandler(404, "Comment not found!"));
  const userIndex = comment.likes.indexOf(req.user.id);
  if (userIndex === -1) {
    comment.likes.push(req.user.id);
    comment.numberOfLikes++;
  } else {
    comment.likes.splice(userIndex, 1);
    comment.numberOfLikes--;
  }
  await comment.save();
  res.status(200).json(comment);
});

export const editComment = catchAsync(async (req, res, next) => {
  const { content } = req.body;
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment) return next(errorHandler(404, "Comment not found!"));
  if (!req.user.isAdmin || req.user.id !== comment.userId)
    return next(
      errorHandler(400, "You do not have permission to edit this comment!")
    );
  const editedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );
  if (!editedComment) return next(errorHandler(403, "Something went wrong!"));
  res.status(200).json(editedComment);
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
  if (!deletedComment) return next(errorHandler(403, "Something went wrong!"));
  res.status(204).json({});
});
