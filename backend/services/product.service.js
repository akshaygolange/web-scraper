import Product from "../models/product.model.js";

export const saveProducts = async (products) => {
  const result = await Product.insertMany(products, {
    ordered: false,
  });

  return result;
};