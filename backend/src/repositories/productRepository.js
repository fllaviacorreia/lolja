const connectDB = require('../config/db');
const { validateProduct } = require('../validators/productValidator');

class ProductRepository {
    static async save(data) {
        const db = await connectDB();
        try {
            const validatedProduct = validateProduct(data);
            if (!validatedProduct.isValid) {
                console.error('Validation error:', validatedProduct.errors); 
                throw new Error('Product data is invalid');
            }

            const query = `
                INSERT INTO products (name, brand, price, quantity) 
                VALUES ($1, $2, $3, $4)    
                RETURNING *;
            `;
            
            const result = await db.query(query, [
                validatedProduct.data.name, 
                validatedProduct.data.brand,
                validatedProduct.data.price,
                validatedProduct.data.quantity
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting product:', error.message);
            throw error;
        }
    }
}

module.exports = ProductRepository;