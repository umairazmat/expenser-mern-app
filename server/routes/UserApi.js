import { Router } from "express";
import passport from "passport";
const router = Router();
import * as UserController from "../controllers/UserController.js";

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),UserController.getUser);

export default router;