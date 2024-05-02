import express from "express";
import { createTweet, showTweet, likeTweet, unlikeTweet, addHighlight, removehighlight, getTweetsWithMostLikes, showAllTweet } from "../controllers/tweetController.js";


const router = express.Router();

router.post("/tweet", createTweet);
router.get("/showTweet", showTweet);
router.get("/showAllTweet", showAllTweet);
router.post("/like", likeTweet);
router.post('/unlike', unlikeTweet);
router.get("/tweets/most-likes", getTweetsWithMostLikes);
router.post('/highlights/:tweetId', addHighlight);
router.put('/tweets/removeHighlight/:tweetId', removehighlight);

export default router;