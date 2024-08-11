import express from "express";
import {
  signup,
  signin,
  googleAuth,
  signout,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/google-auth").post(googleAuth);
router.route("/sign-out").post(signout);

export default router;
