// create a product
const createAProduct = async (req, res, collection) => {
  const product = req.body;
  const result = await collection.insertOne(product);
  res.send(result);
};
module.exports = createAProduct;
