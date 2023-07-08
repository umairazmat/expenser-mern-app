import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  amount: Number,
  title: String,
  description: String,
  date: {type: Date , default: new Date()},
  createdAt: { type: Date , default: Date.now }
});

export default mongoose.model("Transaction", TransactionSchema);
