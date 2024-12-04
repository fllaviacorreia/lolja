const express = require("express");

const ProductController = require('../controllers/productController');
const ProductRouter = express.Router();

ProductRouter.post("/register", ProductController.register);

module.exports = ProductRouter;