import { Router } from "express";
import TransactionModel from "../models/Transaction.js";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import * as TransactionController from "../controllers/TransactionController.js";

const router = Router();

router.get( "/",passport.authenticate("jwt", { session: false }),TransactionController.get);
router.post("/", TransactionController.create);
router.delete("/:id", TransactionController.destroy);
router.patch("/:id", TransactionController.update);

export default router;
