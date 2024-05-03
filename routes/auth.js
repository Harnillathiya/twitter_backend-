import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";
import { getToken, getUserInformation, login } from "../controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", getToken);
router.get("/getUsers", getUsers);
router.get("/userInformation", authMiddleware, getUserInformation)



export default router;