const { ObjectId } = require("mongodb");
const updateAProduct = async (req, res, collection) => {
  const id = req.params.id;
  const product = req.body;
  const updatedProduct = {
    $set: product,
  };
  const filter = { _id: new ObjectId(id) };
  const option = {
    upsert: true,
  };

  const result = await collection.updateOne(filter, updatedProduct, option);

  res.send(result);
};

module.exports = updateAProduct;
