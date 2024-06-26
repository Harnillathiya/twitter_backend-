import Tweet from "../Models/Tweet.js";

export const createTweet = async (req, res) => {
  const userId = req.user._id;

  const newTweet = new Tweet({ ...req.body, userId });
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedTweet,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to Create. Try Again" });
  }
};

export const showTweet = async (req, res) => {
  const userId = req.user._id;
  try {
    const tweets = await Tweet.find({ userId }).populate("comments");
    res.status(200).json({
      success: true,
      message: "successful",
      data: tweets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const showAllTweet = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate("comments");
    res.status(200).json({
      success: true,
      message: "successful",
      data: tweets,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: " internal server error" });
  }
};

export const likeTweet = async (req, res) => {
  const { tweetId } = req.body;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
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
    res
      .status(500)
      .json({ success: false, message: "Failed to like tweet. Try again" });
  }
};

export const unlikeTweet = async (req, res) => {
  const { tweetId } = req.body;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
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
    res
      .status(500)
      .json({ success: false, message: "Failed to unlike tweet. Try again" });
  }
};

export const addHighlight = async (req, res) => {
  const { tweetId } = req.params; 
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }
    tweet.isHighlight = true;
    await tweet.save();
    return res.status(200).json({
      success: true,
      message: `Tweet highlighted successfully`,
      tweet: tweet,
    });
  } catch (err) {
    console.error("Error adding highlight:", err);
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to highlight tweet. Try again",
      });
  }
};

export const removehighlight = async (req, res) => {
  const { tweetId } = req.params;
  const { isHighlight } = req.body;
  try {
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res
        .status(404)
        .json({ success: false, message: "Tweet not found" });
    }
    tweet.isHighlight = isHighlight;
    await tweet.save();

    return res.status(200).json({
      success: true,
      message: `Highlight updated for tweet with ID: ${tweetId}`,
      tweet: tweet,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update highlight" });
  }
};

export const getTweetsWithMostLikes = async (req, res) => {
  try {
    const tweetsWithMostLikes = await Tweet.find({ likes: { $gt: 0 } })
      .sort({ likes: -1 })
      .limit(5);
    res.status(200).json({
      success: true,
      message: "Successfully fetched tweets with most likes",
      data: tweetsWithMostLikes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
