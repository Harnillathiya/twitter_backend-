import express from "express";
import { createTweet, showTweet, likeTweet, unlikeTweet, addHighlight, removehighlight, getTweetsWithMostLikes, showAllTweet } from "../controllers/tweetController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";



const router = express.Router();

router.post("/tweet", authMiddleware, createTweet);
router.get("/showTweet", authMiddleware, showTweet);
router.get("/showAllTweet", authMiddleware, showAllTweet);
router.post("/like", likeTweet);
router.post('/unlike', unlikeTweet);
router.get("/tweets/most-likes", getTweetsWithMostLikes);
router.post('/highlights/:tweetId', addHighlight);
router.put('/tweets/removeHighlight/:tweetId', removehighlight);

export default router;