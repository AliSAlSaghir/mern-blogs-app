import { request } from "express";
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
