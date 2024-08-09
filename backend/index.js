import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
import connectDB from "./config/db.js";

connectDB();

const app = express();

app.use("/api/v1/users", userRoutes);

const port = process.env.PORT || 5001;
app.listen(port, (req, res) => console.log("Server running on port 5001"));
