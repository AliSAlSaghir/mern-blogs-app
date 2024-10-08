import catchAsync from "./catchAsync.js";

const authorizeAdmin = catchAsync(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin!" });
  }
});

export default authorizeAdmin;
