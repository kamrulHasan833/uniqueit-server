// create a product
const createAProduct = async (req, res, collection) => {
  const product = req.body;
  const result = await collection.insertOne(product);
  res.send(result);
};
// create a cart product
const createACartProduct = async (req, res, collection) => {
  const product = req.body;
  const result = await collection.insertOne(product);
  res.send(result);
};
module.exports = { createAProduct, createACartProduct };
