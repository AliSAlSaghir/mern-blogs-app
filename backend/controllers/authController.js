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
  res.status(200).json({
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    profilePicture: newUser.profilePicture,
    isAdmin: newUser.isAdmin,
  });
});

export const signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields all required!"));
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(errorHandler(404, "Wrong email or password!"));
  }
  const validPassword = bcryptjs.compareSync(password, existingUser.password);
  if (!validPassword) {
    return next(errorHandler(404, "Wrong email or password!"));
  }

  generateToken(res, existingUser._id);

  res.status(200).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    profilePicture: existingUser.profilePicture,
    isAdmin: existingUser.isAdmin,
  });
});

export const googleAuth = catchAsync(async (req, res, next) => {
  const { username, email, googlePhotoUrl } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    generateToken(res, existingUser._id);
    res.status(201).json({
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      profilePicture: existingUser.profilePicture,
      isAdmin: existingUser.isAdmin,
    });
  } else {
    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
    const newUser = new User({
      username:
        username.toLowerCase().split(" ").join("") +
        Math.random().toString(9).slice(-4),
      password: hashedPassword,
      email,
      profilePicture: googlePhotoUrl,
    });

    generateToken(res, newUser._id);
    await newUser.save();

    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      isAdmin: newUser.isAdmin,
    });
  }
});

export const signout = catchAsync((req, res, next) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Signed out successfully",
  });
});
