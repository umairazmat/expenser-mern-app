import { Router } from 'express';
const router = Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";

  // getting user from server
  router.post("/register", async (req, res) => {
    try {

      // Check if user is already registered
      console.log(req.body);
      const { email , password , firstName, lastName} = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
         res.status(400).json({ error: "User already exists" });
         return;
      }
     
      // Hash the password
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
       const hash = await  bcrypt.hashSync(password, salt);
  
     // Saving data in the database
     
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(201).json({ message: "New User is Created" });
    } catch (error) {
      // Handle the error appropriately
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

export default router;