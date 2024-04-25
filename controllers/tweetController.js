import Tweet from "../Models/Tweet.js";
import Comments from "../Models/Comment.js";

export const createTweet = async (req, res) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedTweet,
    });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ success: false, message: "Failed to Create . Try Again" });
  }
};


export const showTweet = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate('comments')
    res.status(200).json({
      success: true,
      message: "successful",
      data: tweets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: " internal server error" });
  }
}

export const likeTweet = async (req, res) => {
  const { tweetId } = req.body;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ success: false, message: "Tweet not found" });
    }
    tweet.likes++;
    const updatedTweet = await tweet.save();
    res.status(200).json({
      success: true,
      message: "Tweet liked successfully",
      data: updatedTweet,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to like tweet. Try again" });
  }
};

export const unlikeTweet = async (req, res) => {
  const { tweetId } = req.body;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ success: false, message: "Tweet not found" });
    }
    if (tweet.likes > 0) {
      tweet.likes--;
    }
    const updatedTweet = await tweet.save();
    res.status(200).json({
      success: true,
      message: "Tweet unliked successfully",
      data: updatedTweet,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to unlike tweet. Try again" });
  }
};