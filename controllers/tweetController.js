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
   export const showTweet = async(req, res) => {
    try {
      const tweets = await Tweet.find()
      res.status(200).json({
          success: true,
          message: "successful",
          data: tweets,
        });
  } catch (error) {
      res.status(500).json({ success: true, message: " internal server error" });
  }
    
   }

   