import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const categories = [
  {label: "Food" , icon:"user"},
  {label: "Transportation", icon:"user"},
  {label: "Shopping", icon:"user"},
  {label: "Entertainment", icon:"user"},
  {label: "Health", icon:"user"},
  {label: "Education", icon:"user"},
  {label: "Others", icon:"user"},
]

export const register = async (req, res) => {
  try {
    // Check if user is already registered
    const { email, password, firstName, lastName } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);

    // Saving data in the database

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hash,
      categories,
    });
    await newUser.save();
    res.status(201).json({ message: "New User is Created" });
  } catch (error) {
    // Handle the error appropriately
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
    try {
      // Check if user is already registered
      const { email, password } = req.body;
  
      const userExists = await User.findOne({ email });
  
      if (!userExists) {
        res.status(406).json({ error: 'Credentials not found' });
        return;
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatched = await bcrypt.compare(password, userExists.password);
  
      if (!passwordMatched) {
        res.status(406).json({ error: 'Invalid Credentials' });
        return;
      }
  
      // Create a JWT token
  
      const payload ={
        username:email ,
        _id:userExists._id
      }
      // console.log("Payload", payload)
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({ message: 'Successfully logged in', token , userExists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }