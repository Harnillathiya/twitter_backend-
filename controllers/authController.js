import User from "../Models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Create . Try Again" });
  }
};


export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (req.body.password !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect credentials" });
    }
    return res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
