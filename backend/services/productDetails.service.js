import Product from "../models/product.model.js";

export const updateProductDetails = async (productDetails) => {
const updatedProduct = await Product.findOneAndUpdate(
  { sourceUrl: productDetails.sourceUrl },
  {
    $set: {
      author: productDetails.author,
      price: productDetails.price,
      lastScrapedAt: new Date(),
    },
  },
  {
    returnDocument: "after",
  }
);

  return updatedProduct;
};