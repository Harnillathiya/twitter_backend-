import express from "express";
import { followUser, unfollowUser } from "../controllers/followController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/follow", authMiddleware, followUser);
router.delete("/unfollow", authMiddleware, unfollowUser);

export default router;
