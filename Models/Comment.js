import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String
        },
        timestamp: {
            type: Number
        },
        likes: {
            type: Number,
            default: 0
        },

    },
    { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);