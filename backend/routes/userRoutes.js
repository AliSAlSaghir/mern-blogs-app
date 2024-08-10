import express from "express";
import { updateUser, deleteUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router
  .route("/:id")
  .put(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);

export default router;
