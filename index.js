// import external module
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

// import internal
const {
  getTest,
  getBrands,
  getProducts,
  getBrandProducts,
  getAProduct,
  getCartProducts,
} = require("./handlers/getHandlers");
const {
  createAProduct,
  createACartProduct,
} = require("./handlers/createHandlers");
const deleteACartProduct = require("./handlers/deleteHandler");

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
    const cartCollection = db.collection("carts");

    // get all brands
    app.get("/brands", (req, res) => getBrands(req, res, brandCollection));

    // get all brands
    app.get("/products", (req, res) =>
      getProducts(req, res, productCollection)
    );
    // get all products under a brand
    app.get("/products/:brand", (req, res) =>
      getBrandProducts(req, res, productCollection)
    );
    // get all cart products
    app.get("/carts/:username", (req, res) =>
      getCartProducts(req, res, cartCollection)
    );

    // get a product
    app.get("/products/details/:id", (req, res) =>
      getAProduct(req, res, productCollection)
    );

    // crate a product
    app.post("/products", (req, res) =>
      createAProduct(req, res, productCollection)
    );
    // crate a  cart product
    app.post("/carts", (req, res) =>
      createACartProduct(req, res, cartCollection)
    );
    // delete a  cart product
    app.delete("/carts/:id", (req, res) =>
      deleteACartProduct(req, res, cartCollection)
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
