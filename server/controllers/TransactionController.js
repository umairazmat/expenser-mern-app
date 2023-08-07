import TransactionModel from "../models/Transaction.js";
import Transaction from "../models/Transaction.js";

export const get = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({}).sort({
      createdAt: -1,
    });
    res.json({ data: transactions });
  } catch (error) {
    // Handle the error appropriately
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const create = async (req, res) => {
  try {
    const { amount, title, description, date } = req.body;
    const transaction = new TransactionModel({
      amount,
      title,
      description,
      date,
    });

    await transaction.save(); // Saving data in the database
    res.json({ message: "Successfully Added" });
  } catch (error) {
    // Handle the error appropriately
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function for deleting a transaction
export const destroy = async (req, res) => {
  console.log(req.params.id); // Log the transaction ID to the console for debugging
  try {
    await Transaction.deleteOne({ _id: req.params.id }); // Delete the transaction with the given ID
    res.json({ message: "Successfully Deleted" }); // Respond with a success message
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" }); // Handle errors by responding with a 500 status code and an error message
  }
};


export const update =  async (req, res) => {
  try {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}