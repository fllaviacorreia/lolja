const express = require("express");

const ProductController = require('../controllers/productController');
const ProductRouter = express.Router();

ProductRouter.post("/register", ProductController.register);
ProductRouter.delete("/disable/:id", ProductController.disable);


module.exports = ProductRouter;