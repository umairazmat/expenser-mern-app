import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String , required:["First Name Field is required ⚠️"] } ,
  lastName: { type: String , required:["Last Name Field is required ⚠️"] },
  email: { type: String , required:["Email  Field is required ⚠️"] },
  password: { type: String , required:[" Password Field is required ⚠️"] },
},
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
