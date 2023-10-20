const { ObjectId } = require("mongodb");
// get testing
const getTest = async (req, res) => {
  res.send("UniqueIt server is running...");
};

// get all the brands
const getBrands = async (req, res, collection) => {
  const cursor = collection.find();
  const result = await cursor.toArray();
  const brands = result.filter((brand) => brand.brand);

  res.send(brands);
};

// get all products
const getProducts = async (req, res, collection) => {
  const cursor = collection.find();
  const result = await cursor.toArray();

  res.send(result);
};
// get all products uder a brand
const getBrandProducts = async (req, res, collection) => {
  const brand = req.params.brand;
  const cursor = collection.find({ brand: brand });
  const result = await cursor.toArray();

  res.send(result);
};
// get all cards products
const getCartProducts = async (req, res, collection) => {
  const username = req.params.username;
  const cursor = collection.find({ username: username });
  const result = await cursor.toArray();

  res.send(result);
};
// get a product
const getAProduct = async (req, res, collection) => {
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });

  res.send(result);
};

module.exports = {
  getTest,
  getBrands,
  getProducts,
  getBrandProducts,
  getAProduct,
  getCartProducts,
};

// helll
