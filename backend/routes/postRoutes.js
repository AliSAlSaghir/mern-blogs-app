import express from "express";
import verifyToken from "../utils/verifyToken.js";
import authorizeAdmin from "../utils/authorizeAdmin.js";
import { createPost } from "../controllers/postControler.js";

const router = express.Router();

router.route("/").post(verifyToken, authorizeAdmin, createPost);

export default router;
