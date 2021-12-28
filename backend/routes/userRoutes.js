import express from "express";

import {
  authUser,
  getUserProfile,
  signup,
  updateUserProfile,
  getUsers,
  deleteUser,
} from "../controller/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signin", authUser);
router.route("/signup").post(signup);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);

export default router;
