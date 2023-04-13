const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes/index.routes.js");
const mongoose = require("mongoose");

require("dotenv").config();
const PORT = process.env.PORT;


require('./initDB.js')();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/", routes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});


module.exports = app;