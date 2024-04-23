import express from 'express';
import { createComment } from '../controllers/commentController.js';

const router = express.Router();

router.post('/comments', createComment);
// router.get('/showComments/:tweetId', showComments);

export default router;
