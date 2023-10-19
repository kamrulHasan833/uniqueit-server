// import external module
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// create express app
const app = express();

//server port
const port = process.env.PORT || 5000;

// common  middleware
app.use(express.json());
app.use(cors());

//mongodb configuration

const uri = `mongodb+srv://${process.env.USER_NAME_MDB}:${process.env.USER_PASSWORD_MDB}@cluster0.qoh5erv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// apis || routes
app.get("/", (req, res) => {
  res.send("UniqueIt server is running...");
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("uniqueit");
    const productCollection = db.collection("products");

    // crate a product
    app.post("/products", async (req, res) => {
      const product = req.body;
      const result = await productCollection.insertOne(product);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// listen server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}...`);
});
