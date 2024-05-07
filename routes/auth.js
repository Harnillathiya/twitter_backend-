import express from "express";
import { createUser, findAllUsers, } from "../controllers/userController.js";
import { getToken, login, getUserInformation, } from "../controllers/authController.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", getToken);
router.get("/users", authMiddleware,  findAllUsers);
router.get("/userInformation", authMiddleware, getUserInformation);

export default router;
