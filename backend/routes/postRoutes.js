import express from "express";
import verifyToken from "../utils/verifyToken.js";
import authorizeAdmin from "../utils/authorizeAdmin.js";
import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.route("/").get(getPosts).post(verifyToken, authorizeAdmin, createPost);
router.route("/:id").delete(verifyToken, authorizeAdmin, deletePost);

export default router;
