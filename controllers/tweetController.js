import Tweet from "../Models/Tweet.js";

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
      res
        .status(500)
        .json({ success: false, message: "Failed to Create . Try Again" });
    }
    
  };
  