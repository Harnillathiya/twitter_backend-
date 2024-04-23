import express from "express";
import { createTweet, showTweet, likeTweet, unlikeTweet } from "../controllers/tweetController.js";


const router = express.Router();

router.post("/tweet", createTweet);
router.get("/showTweet", showTweet);
router.post("/like", likeTweet);
router.post('/unlike', unlikeTweet);

export default router;