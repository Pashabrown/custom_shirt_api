///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// const {Shirts} = require("./Models/Shirts")
// pull PORT from .env, give default value of 3000
// pull MONGODB_URL from .env
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Connection Events
mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

///////////////////////////////
// MODELS
////////////////////////////////
const ShirtsSchema = new mongoose.Schema({
  tshirtcolor: String,
  imgTshirt: String,
  upperText: String,
  lowerText: String,
  textsize: Number,
  textcolor: String
});

const Shirts = mongoose.model("Shirts", ShirtsSchema);

///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Shirt INDEX ROUTE
app.get("/shirts", async (req, res) => {
  try {
    // send all people
    res.json(await Shirts.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Shirts CREATE ROUTE
app.post("/shirts", async (req, res) => {
  try {
    // send all people
    res.json(await Shirts.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Shirts update ROUTE
app.put("/shirts/:id", async (req, res) => {
  try {
    // send all people
    res.json(
      await Shirts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// Shirts CREATE ROUTE
app.delete("/shirts/:id", async (req, res) => {
  try {
    // send all people
    res.json(await Shirts.findByIdAndRemove(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));