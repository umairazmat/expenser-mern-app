import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  amount: Number,
  title: String,
  description: String,
  date: { type: Date, default: new Date().toLocaleString() },
  createdAt: { type: String, default: new Date().toLocaleString() },
});

export default new mongoose.model("Transaction", TransactionSchema);
