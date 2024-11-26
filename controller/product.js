const productService = require("../service/product");

const getAllProducts = () => {
    
    return productService.getAll();
}

module.exports = {
    getAllProducts
}