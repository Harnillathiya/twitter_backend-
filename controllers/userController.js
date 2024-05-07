import Follow from "../Models/follow.js";
import User from "../Models/User.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const currentUser = req.user._id;
    // console.log(users, "users");
    // console.log(currentUser, "currentuser");

     for(const user of users){

      const data = await isFollow(user._id, currentUser)
      user.isFollow = data
      // console.log(user, data);
     }
     
    res.status(200).json({
      success: true,
      message: "Users found successfully",
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to find users" });
  }
};

async function isFollow(targetUserId, sourceUserId){
   const follow = await Follow.findOne({source: sourceUserId, target: targetUserId});
   if(!follow){
    return false
   }
   return true

}
