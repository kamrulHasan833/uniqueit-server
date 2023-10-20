const { ObjectId } = require("mongodb");

const deleteACartProduct = async (req, res, colloction) => {
  const id = req.params.id;
  const result = await colloction.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

module.exports = deleteACartProduct;
