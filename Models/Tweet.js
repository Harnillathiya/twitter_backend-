import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
    {

            
        // username: {
        //     type: String,
        //     //   required: true,
        // },
        // id: {
        //     type: String,
        //     //   required: true,
        // },
        // tweet: {
        //     type: String,
        //     //   required: true,
        // },
        // likes: {
        //     type: String,
        //     //   required: true,
        // },
        // tweet: {
        //     type: String,
        //     //   required: true,
        // },
        // tweet: {
        //     type: String,
        //     //   required: true,
        // },
        // F
    },
    { timestamps: true }
);

export default mongoose.model("Tweet", tweetSchema);