// import external module
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// create express app
const app = express();

//server port
const port = process.env.PORT || 5000;

// common  middleware
app.use(express.json());
app.use(cors());

// apis || routes
app.get("/", (req, res) => {
  res.send("UniqueIt server is running...");
});

// listen server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
