import express from "express";
import {
  createUser,
  findAllUsers,
} from "../controllers/userController.js";
import { getToken, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", login);
router.get("/token", getToken);
router.get("/users", findAllUsers);

export default router;
