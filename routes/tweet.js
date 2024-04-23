import express from "express";
import { createTweet } from "../controllers/tweetController.js";
import { showTweet } from "../controllers/tweetController.js";


const router = express.Router();

router.post("/tweet", createTweet);
router.get("/showTweet", showTweet);


export default router;