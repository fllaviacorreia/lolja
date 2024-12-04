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

const disable = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid id'});
        }
        const innactiveProduct = await ProductRepository.innactive(id);
        res.status(200).json(innactiveProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findAllProducts = async (req, res) => {
    try {
        const products = await ProductRepository.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const findById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid id'});
        }

        const product = await ProductRepository.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    register,
    disable,
    findAllProducts,
    findById
}