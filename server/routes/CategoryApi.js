import { Router } from "express";
import * as CategoryController from "../controllers/CategoryController.js";
const router = Router();

router.delete("/:id", CategoryController.destroy);

export default router;