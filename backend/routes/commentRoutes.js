import express from "express";
import {
  createComment,
  getCommentsForPost,
  likeComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

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
