import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
import connectDB from "./config/db.js";

connectDB();

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 5001;
app.listen(port, (req, res) => console.log("Server running on port 5001"));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
