import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import catchAsync from "../utils/catchAsync.js";
import generateToken from "../utils/generateToken.js";

export const signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required!"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });

  await newUser.save();
  res.status(201).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  });
});

export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "Wrong email or password!"));
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(errorHandler(404, "User not found!"));
  }
  const validPassword = bcryptjs.compareSync(password, existingUser.password);
  if (!validPassword) {
    return next(errorHandler(404, "Wrong email or password!"));
  }

  generateToken(res, existingUser._id);

  res.status(201).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
  });
});
