import Follow from "../Models/follow.js";
import User from "../Models/User.js";

export const followUser = async (req, res) => {
    try {
        const target = req.body.id;
        const source = req.user._id;

        const existingFollow = await Follow.findOne({ target, source });
        if (existingFollow) {
            return res.status(400).json({
                success: false,
                message: "Already following this user",
            });
        }
        try {
            const user = await User.findById(target);
            // console.log("Retrieved tweet:", user);
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: "user not found" });
            }
            user.followed = true;
            await user.save();

        } catch(err) {
            return res
            .status(500)
            .json({
              success: false,
              message: "Failed to follow. Try again",
            });
        }

        const follow = new Follow({ target, source });

        const savedFollow = await follow.save();

        res.status(200).json({
            success: true,
            message: "Follow created successfully",
            data: savedFollow,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create follow" });
    }
};


export const unfollowUser = async (req, res) => {
    try {
        const target = req.body.id;
        const source = req.user._id;

        const unfollow = await Follow.findOneAndDelete({ target, source });
        try {
            const user = await User.findById(target);
            // console.log("Retrieved tweet:", user);
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: "user not found" });
            }
            user.followed = false;
            await user.save();

        } catch(err) {
            return res
            .status(500)
            .json({
              success: false,
              message: "Failed to follow. Try again",
            });
        }

        if (unfollow) {
            res.status(200).json({
                success: true,
                message: "Unfollowed successfully",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No follow found to unfollow",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to unfollow" });
    }
};

