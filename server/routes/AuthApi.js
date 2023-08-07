import { Router } from "express";
const router = Router();
import * as AuthController from "../controllers/AuthController.js";

// Register
// getting user from server
router.post("/register", AuthController.register);
// Login
router.post("/login", AuthController.login);
export default router;
