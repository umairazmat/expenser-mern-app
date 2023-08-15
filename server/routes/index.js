import { Router } from "express";
const router = Router();
import TransactionRouters from "./Transaction.js";
import AuthApi from "./AuthApi.js";
import UserApi from "./UserApi.js";
import passport from "passport";

router.use("/auth",AuthApi);
router.use("/transaction", passport.authenticate("jwt", { session: false }),TransactionRouters);
router.use("/user", UserApi);

export default router;

