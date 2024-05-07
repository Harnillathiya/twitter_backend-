import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
    source: {
        type: String,
    },
    target: {
        type: String,
    }
});

export default mongoose.model("Follow", followSchema);
