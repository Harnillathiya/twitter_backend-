import jwt from 'jsonwebtoken';
import User from "../Models/User.js";

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
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
    const token = jwt.sign({
      userId: user._id
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' });

    return res.status(200).json({ success: true, message: "Login successful", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
