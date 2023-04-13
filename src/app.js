import ProductManager from './ProductManager.js';

const express = require("express");
const app = express();
const fs = require("fs");

const manager = new ProductManager('./products.json');

//Home
app.get("/", (req, res) => {
  res.send("Home Page");
});

//Index Products
app.get("/products", (req, res) => {
    const products = ProductManager.readFile;
    const limit = parseInt(req.query.limit);
    if (limit) {
      products = products.slice(0, limit);
    }
    return res.status(200).send(products);
});

// Query Filter
app.get("/products/:id", (req, res) => {
    const products = ProductManager.readFile;
    const id = parseInt(req.params.id);
    const product = products.find((product) => product.id === id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
});

// Initialize the server on port 8080
app.listen(8080, () => {
  console.log("Open server on port 8080");
});
