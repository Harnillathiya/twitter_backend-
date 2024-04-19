import express from "express";
import { createTweet } from "../controllers/tweetController.js";


const router = express.Router();

router.post("/tweet", createTweet);


export default router;