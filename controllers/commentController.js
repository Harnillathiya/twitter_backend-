import Comment from "../Models/Comment.js";
import Tweet from "../Models/Tweet.js";

export const createComment = async (req, res) => {

    try {
        const tweetId = req.body.tweetId
        const newComment = new Comment({ ...req.body })
        const savedComment = await newComment.save()
        const tweet = await Tweet.findById(tweetId)
        tweet.comments.push(savedComment)
        await tweet.save()

        res.status(200).json({ success: true, message: "Commnet Submitted", data: savedComment })
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "failed to submit" })
    }
};
export const showComments = async (req, res) => {

    try {
        const tweetId = req.params.id
        console.log(tweetId);
        const tweet = await Tweet.findOne({ _id: tweetId }).populate('comments');
        console.log(tweet);
        if (!tweet) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        res.status(200).json({
            success: true,
            message: "Successful",
            data: tweet.comments,
        })
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: "not found" });
    }
};

export const likeComment = async (req, res) => {
    const { CommentId } = req.body;
    console.log(CommentId,"gggggggggggggggggg");
    try {
        const comment = await Comment.findById(CommentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        comment.likes++;
        const updatedComment = await comment.save();
        res.status(200).json({
            success: true,
            message: "Comment liked successfully",
            data: updatedComment,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to like Comment. Try again" });
    }
};



export const DislikeComment = async (req, res) => {
    const { CommentId } = req.body;
    try {
        const comment = await Comment.findById(CommentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }
        if (comment.likes > 0) {
            comment.likes--;
        }
        const updatedComment = await comment.save();
        res.status(200).json({
            success: true,
            message: "Comment unliked successfully",
            data: updatedComment,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Failed to unlike Comment. Try again" });
    }
};
