const ProductRepository = require('../repositories/productRepository');
const Product = require('../models/product');

const register = async (req, res) => {
    try {
        const { name, brand, price, quantity } = req.body;
        
        // Verificar se todos esses dados vieram
        if (!name || !brand || !price || !quantity) {
            return res.status(400).json({ error: 'Dados inválidos'});
        }
        
        const newProduct = new Product(null, name, brand, price, quantity);
        
        const savedProduct = await ProductRepository.save({
                name: newProduct.name,
                brand: newProduct.brand,
                price: newProduct.price,
                quantity: newProduct.quantity,
            }     
        )
        res.status(201).json(savedProduct);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    register
}