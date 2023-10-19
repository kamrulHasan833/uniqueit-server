// import external module
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// import internal
const { getTest, getBrands, getProducts } = require("./handlers/getHandlers");
const createAProduct = require("./handlers/createHandlers");
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
app.get("/", getTest);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = client.db("uniqueit");

    // collection
    const brandCollection = db.collection("brands");
    const productCollection = db.collection("products");

    // get all brands
    app.get("/brands", (req, res) => getBrands(req, res, brandCollection));

    // get all brands
    app.get("/products", (req, res) =>
      getProducts(req, res, productCollection)
    );

    // crate a product
    app.post("/products", (req, res) =>
      createAProduct(req, res, productCollection)
    );

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
