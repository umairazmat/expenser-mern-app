import { Router } from 'express';
const router = Router();

  // getting user from server
  router.post("/register", async (req, res) => {
    try {
    //   const { amount, title, description, date } = req.body;
    //   const transaction = new TransactionModel({
    //     amount,
    //     title,
    //     description,
    //     date
    //   });
  
    //   await transaction.save(); // Saving data in the database
      res.json({ message: "Successfully Added" });
    } catch (error) {
      // Handle the error appropriately
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router;