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

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, users: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
