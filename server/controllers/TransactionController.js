import TransactionModel from "../models/Transaction.js";
import Transaction from "../models/Transaction.js";

export const get = async (req, res) => {
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: {
          $push: {
            amount: "$amount",
            title: "$title",
            description: "$description",
            date: "$date",
            category_id: "$category_id",
            type: "$type",
            _id: "$_id",
          },
        },
        totalExpenses: { $sum: "$amount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  res.json({ data: demo });
};

export const create = async (req, res) => {
  // console.log(req.body); // Log the request body to the console for debugging purposes
  // console.log(req.user); // Log the request body to the console for debugging purposes
  try {
    const { amount, title, description, date , category_id } = req.body;
    const transaction = new TransactionModel({
      amount,
      title,
      description,
      date,
      user_id: req.user._id,
      category_id
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
  // console.log(req.params.id); // Log the transaction ID to the console for debugging
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