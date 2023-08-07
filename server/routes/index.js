import { Router } from "express";
const router = Router();
import TransactionRouters from "./Transaction.js";
import AuthApi from "./AuthApi.js";
import UserApi from "./UserApi.js";

router.use("/auth",AuthApi);
router.use("/transaction",TransactionRouters);
router.use("/user", UserApi);

export default router;

