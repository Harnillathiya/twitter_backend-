import express from "express";
import { createUser } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";


const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);


export default router;