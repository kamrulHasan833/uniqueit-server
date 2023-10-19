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

module.exports = {
  getTest,
  getBrands,
  getProducts,
};
