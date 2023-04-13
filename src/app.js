const express = require("express");
const ProductManager = require('./ProductManager.js');

const app = express();
const manager = new ProductManager('./products.json');

//Home
app.get("/", (req, res) => {
  res.send("Home Page");
});

//Index Products
app.get("/products", async (req, res) => {
  const products = await manager.getProducts(parseInt(req.query.limit));
  return res.status(200).send(products);
});

// Query Filter
app.get("/products/:id", async (req, res) => {
  const product = await manager.getProductById(parseInt(req.params.id));
  if (!product) {
    return res.status(404).send({ error: "Product not found" });
  }
  res.status(200).send(product);
});

// Initialize the server on port 8080
app.listen(8080, () => {
  console.log("Open server on port 8080");
});
