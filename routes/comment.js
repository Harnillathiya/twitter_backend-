import express from 'express';
import { createComment, dislikeComment, likeComment, showComments } from '../controllers/commentController.js';

const router = express.Router();

router.post('/comments', createComment);
router.get('/showComments/:id', showComments);
router.post("/likecomment", likeComment);
router.post('/DislikeComment', dislikeComment);

export default router;
