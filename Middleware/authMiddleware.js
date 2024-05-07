import jwt from "jsonwebtoken";
import User from "../Models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Authorization header missing" });
        }

        const token = req.headers.authorization;
        const decodeToken = jwt.decode(token);

        if (!decodeToken || !decodeToken.userId) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const id = decodeToken.userId;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user; 
        next(); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};