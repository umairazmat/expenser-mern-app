import { Router } from 'express';
import TransactionModel from "../models/Transaction.js";


const router = Router();


// sending transaction to server
router.get("/transaction", async (req, res) => {
    const transaction = await TransactionModel.find({}).sort({ createdAt: -1 });
    res.json({data:transaction});
  });
  
  // getting transactions from server
  router.post("/transaction", async (req, res) => {
    const { amount, title, description, date } = req.body;
    const Transaction = new TransactionModel({
      amount,
      title,
      description,
      date,
    });
  
    await Transaction.save(); // saving data in db
    res.json({ message: "Successfully Added" });
  });
  

  export default router;