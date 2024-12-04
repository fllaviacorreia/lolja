const express = require("express");

const ProductController = require('../controllers/productController');
const ProductRouter = express.Router();

ProductRouter.post("/register", ProductController.register);
ProductRouter.delete("/disable/:id", ProductController.disable);
ProductRouter.put("/update/:id", ProductController.updateProduct);
ProductRouter.get("/:id", ProductController.findById);
ProductRouter.get("/", ProductController.findAllProducts);

module.exports = ProductRouter;