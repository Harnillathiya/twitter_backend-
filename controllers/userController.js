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
