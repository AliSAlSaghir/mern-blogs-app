import catchAsync from "../utils/catchAsync.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
export const updateUser = catchAsync(async (req, res, next) => {
  if (req.user._id.toHexString() !== req.params.id)
    return next(errorHandler(400, "You are not allowed to update this user!"));
  if (req.body.password) {
    if (req.body.password.length < 6)
      return next(errorHandler(400, "Password must be at least 6 characters!"));
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20)
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters!")
      );
    if (req.body.username.includes(" "))
      return next(errorHandler(400, "Username must not contain spaces!"));
    if (req.body.username !== req.body.username.toLowerCase())
      return next(errorHandler(400, "Username must be lowercase!"));
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/))
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
      },
    },
    { new: true }
  );

  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    profilePicture: updatedUser.profilePicture,
    isAdmin: updatedUser.isAdmin,
  });
});

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(204).json({ message: "User deleted successfully!" });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return next(errorHandler(404, "User not found!"));
  res.status(204).json({ message: "User deleted successfully!" });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;
  const users = await User.find()
    .sort({ updatedAt: sortDirection })
    .skip(startIndex)
    .limit(limit);

  const totalUsers = await User.countDocuments();

  const now = new Date();

  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  const lastMonthUsers = await User.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
    users,
    totalUsers,
    lastMonthUsers,
  });
});
