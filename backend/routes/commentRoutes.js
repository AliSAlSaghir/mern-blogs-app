import express from "express";
import {
  createComment,
  getCommentsForPost,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import verifyToken from "../utils/verifyToken.js";
import authorizeAdmin from "../utils/authorizeAdmin.js";

const router = express.Router();

router.route("/").get(verifyToken, authorizeAdmin, getComments);
router
  .route("/:postId")
  .get(getCommentsForPost)
  .post(verifyToken, createComment);

router.use(verifyToken);
router
  .route("/:commentId")
  .patch(likeComment)
  .put(editComment)
  .delete(deleteComment);

export default router;
