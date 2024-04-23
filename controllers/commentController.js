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
        console.log(err)
        res.status(500).json({ success: false, message: "failed to submit" })
    }
};
// export const showComments = async (req, res) => {

//     try {
//         const comments = await Comment.find({})

//         res.status(200).json({
//             success: true,
//             message: "Successful",
//             data: comments,
//         })
//     } catch (err) {
//         res.status(404).json({ success: false, message: "not found" });
//     }
// }

