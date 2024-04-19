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
            type:Number,
        },
        isHighlight: {
            type: Boolean,
        }

    },
    { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);