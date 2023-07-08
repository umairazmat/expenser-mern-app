import { Router } from 'express';
import TransactionModel from "../models/Transaction.js";
import Transaction from '../models/Transaction.js';


const router = Router();


// sending transaction to server
router.get("/transaction", async (req, res) => {
  try {
    const transactions = await TransactionModel.find({}).sort({ createdAt: -1 });
    res.json({ data: transactions });
  } catch (error) {
    // Handle the error appropriately
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  
  // getting transactions from server
  router.post("/transaction", async (req, res) => {
    try {
      const { amount, title, description, date } = req.body;
      const transaction = new TransactionModel({
        amount,
        title,
        description,
        date
      });
  
      await transaction.save(); // Saving data in the database
      res.json({ message: "Successfully Added" });
    } catch (error) {
      // Handle the error appropriately
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.delete("/transaction/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      await Transaction.deleteOne({ _id: req.params.id });
      res.json({ message: "Successfully Deleted" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  export default router;