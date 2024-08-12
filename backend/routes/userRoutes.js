import express from "express";
import {
  updateUser,
  deleteUser,
  getUsers,
  deleteMe,
} from "../controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";
import authorizeAdmin from "../utils/authorizeAdmin.js";

const router = express.Router();

router.use(verifyToken);

router.route("/").get(authorizeAdmin, getUsers);

router.route("/deleteMe").delete(deleteMe);

router.route("/:id").put(updateUser).delete(authorizeAdmin, deleteUser);

export default router;
