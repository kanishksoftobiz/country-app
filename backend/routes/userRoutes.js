import express from "express";

import {
  authUser,
  getUserProfile,
  signup,
  updateUserProfile,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signin", authUser);
router.route("/signup").post(signup);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
