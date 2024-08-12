import catchAsync from "../utils/catchAsync.js";
import errorHandler from "../utils/error.js";
import Post from "../models/postModel.js";

export const createPost = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content)
    return next(errorHandler(400, "Please provide all required fields!"));
  const slug = title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const createdPost = new Post({
    ...req.body,
    slug,
    userId: req.user._id,
  });
  const newPost = await createdPost.save();
  res.status(201).json(newPost);
});

export const getPosts = catchAsync(async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const posts = await Post.find({
    ...(req.query.userId && { userId: req.query.userId }),
    ...(req.query.category && { category: req.query.category }),
    ...(req.query.slug && { slug: req.query.slug }),
    ...(req.query.postId && { _id: req.query.postId }),
    ...(req.query.searchTerm && {
      $or: [
        { title: { $regex: req.query.searchTerm, $options: "i" } },
        { content: { $regex: req.query.searchTerm, $options: "i" } },
      ],
    }),
  })
    .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  const totalPosts = await Post.countDocuments();

  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const lastMonthPosts = await Post.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
    posts,
    totalPosts,
    lastMonthPosts,
  });
});

export const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost)
    return next(errorHandler(400, "No post founded with this id!"));
  res.status(200).json({ message: "Post deleted successfully" });
});

export const updatePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        image: req.body.image,
        slug,
      },
    },
    { new: true }
  );
  if (!updatedPost)
    return next(errorHandler(400, "No post founded with this id!"));
  res.status(200).json(updatedPost);
});
