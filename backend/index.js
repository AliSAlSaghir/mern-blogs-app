import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

const port = process.env.PORT || 5000;
app.listen(3000, (req, res) => console.log("Server running on port 3000"));
