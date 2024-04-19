import User from "../Models/User.js";



export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: saveUser,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to Create . Try Again" });
  }
};

