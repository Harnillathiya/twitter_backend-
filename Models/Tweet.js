import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {
        tweet: {
            type: String
        },
        timestamp: {
            type: Number
        },
        likes: {
            type: Number,
            default: 0
        },
        isHighlight: {
            type: Boolean,
        },
        userId: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Comment",
            },
        ],

    },
    { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema)