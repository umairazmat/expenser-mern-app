import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import passportConfig from "./config/passport.js";
import routes from "./routes/index.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Serve of Expense Tracker App");
});
app.use('/',routes);

app.use(passport.initialize());
passportConfig(passport);



dotenv.config();
const Port = process.env.PORT;
const user = process.env.USER;
const password = process.env.PASSWORD;
const url = process.env.URL;



await mongoose
  .connect(
    `mongodb+srv://${user}:${password}${url}/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongo DB Connected Successfully");
  });


app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
