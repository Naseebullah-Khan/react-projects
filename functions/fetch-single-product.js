// domain/.netlify/functions/fetch-single-product
import { product_list } from "./fetch-products.js";
export async function handler(event, context) {
  const { id } = event.queryStringParameters || {};

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "No product ID provided" }),
    };
  }

  const product = product_list.find((p) => p.id === id);

  if (!product) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Product not found" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  };
}
