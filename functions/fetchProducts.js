// domain/.netlify/functions/fetchProducts.js
import { product_list } from "../utils/products.js";
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(product_list),
  };
};
