import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {
        tweet: {
            type: String
        },
        timestamp: {
            type: Number
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }],
        likesCount: {
            type: Number,
            default: 0
        },
        isHighlight: {
            type: Boolean,
        },
        // comment: [
        //     {
        //       type: mongoose.Types.ObjectId,
        //       ref: "Comment",
        //     },
        // ],

    },
    { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);