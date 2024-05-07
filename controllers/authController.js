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



export const getToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = req.headers.authorization;

  const decodeToken = jwt.decode(token);

  if (!decodeToken || !decodeToken.userId) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const id = decodeToken.userId;

  try {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.json(user);

    return user
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export const getUserInformation = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
    // console.log(user,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
  } catch (error) {
    console.error(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired" });
    }
    res.status(500).json({ success: false, message: "Failed to fetch user information" });
  }
};