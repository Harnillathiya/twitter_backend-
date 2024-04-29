import express from "express";
import { createTweet, showTweet, likeTweet, unlikeTweet, addHighlight, removehighlight } from "../controllers/tweetController.js";


const router = express.Router();

router.post("/tweet", createTweet);
router.get("/showTweet", showTweet);
router.post("/like", likeTweet);
router.post('/unlike', unlikeTweet);
router.post('/highlights/:tweetId', addHighlight);
router.put('/tweets/removeHighlight/:tweetId', removehighlight);

export default router;