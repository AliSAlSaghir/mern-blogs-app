import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

import User from "../models/userModel.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return next(errorHandler(401, "Not authorized, token failed."));
    }
  } else {
    return next(errorHandler(401, "Not authorized, no token."));
  }
};

export default verifyToken;
