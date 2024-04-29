import Comment from "../Models/Comment.js";
import Tweet from "../Models/Tweet.js";

export const createComment = async (req, res) => {
    try {
        const { tweetId } = req.body;
        if (!tweetId) {
            return res.status(400).json({ success: false, message: "tweetId is required" });
        }
        const newComment = new Comment({ ...req.body });
        const savedComment = await newComment.save();
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({ success: false, message: "Tweet not found" });
        }
        tweet.comments.push(savedComment);
        await tweet.save();
        return res.status(200).json({ success: true, message: "Comment submitted", data: savedComment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to submit comment" });
    }
};

export const showComments = async (req, res) => {
    try {
        const tweetId = req.params.id;
        console.log("Fetching comments for tweet:", tweetId);
        const tweet = await Tweet.findOne({ _id: tweetId }).populate("comments");
        if (!tweet) {
            return res.status(404).json({ success: false, message: "Tweet not found" });
        }
        return res.status(200).json({ success: true, message: "Comments retrieved successfully", data: tweet.comments });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to fetch comments" });
    }
};

export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        comment.likes++;
        await comment.save();
        return res.status(200).json({ success: true, message: "Comment liked successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to like comment" });
    }
};

export const dislikeComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        if (comment.likes > 0) {
            comment.likes--;
        }
        await comment.save();
        return res.status(200).json({ success: true, message: "Comment disliked successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Failed to dislike comment" });
    }
};
