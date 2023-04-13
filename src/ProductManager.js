const fs = require('fs').promises;
class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async readProducts() {
    try {
      const data = await fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveProducts(products) {
    await fs.writeFileSync(this.path, JSON.stringify(products));
  }

  generateId() {
    const products = this.readProducts();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  addProduct(product) {
    const products = this.readProducts();
    const newProduct = {...product, id: this.generateId()};
    products.push(newProduct);
    this.saveProducts(products);
    console.log(`\nProduct with id ${newProduct.id} has been added`);
  }


  deleteProduct(id) {
    let products = this.readProducts();
    products = products.filter((product) => product.id !== parseInt(id));
    this.saveProducts(products);
    console.log(`\nProduct with id ${id} deleted`);
  }

  modifyProduct(id, price) {
    let products = this.readProducts();
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index === -1) {
      console.log(`\nProduct with id ${id} not found`);
    } else {
      products[index].price = parseFloat(price);
      this.saveProducts(products);
      console.log(`\nProduct with id ${id} modified`);
    }
  }

  updateProduct(id, title, description, price, thumbnail, code, stock) {
    const products = this.readProducts();
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
  
    if (productIndex === -1) {
      console.log(`Product with id ${id} not found`);
      return;
    }
  
    const updatedProduct = {
      id: parseInt(id),
      title,
      description,
      price: parseFloat(price),
      thumbnail,
      code,
      stock: parseInt(stock),
    };
  
    products[productIndex] = updatedProduct;
    this.saveProducts(products);
  
    console.log(`Product with id ${id} has been updated`);
  }

  getProducts() {
    const products = this.readProducts();
    if (products.length === 0) {
      console.log('\nNo products to show');
    } else {
      console.log('\nList of products:\n');
      products.forEach((product) => {
        console.log(`Id: ${product.id}, Title: ${product.title}, Description: ${product.description}, Price: $${product.price}, Thumbnail: ${product.thumbnail}, Code: ${product.code}, Stock: ${product.stock}`);
      });
    }
  }

  getProductById(id) {
    const products = this.readProducts();
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
      console.log(`\nId: ${product.id}`);
      console.log(`Title: ${product.title}`);
      console.log(`Description: ${product.description}`);
      console.log(`Price: $${product.price}`);
      console.log(`Thumbnail: ${product.thumbnail}`);
      console.log(`Code: ${product.code}`);
      console.log(`Stock: ${product.stock}`);
    } else {
      console.log(`\nProduct with id ${id} not found`);
    }
  }
}

module.exports = ProductManager;
