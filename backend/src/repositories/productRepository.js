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

    static async innactive(id) {
        const db = await connectDB();
        try {
            const query = `
                UPDATE products 
                SET status = 'innactive'
                WHERE id = $1
                RETURNING *;
            `;
            const result = await db.query(query, [id]);

            if (result.rowCount === 0) throw new Error('Client not found');
            return result.rows[0];
        } catch (error) {
            console.error('Error innactive product:', error.message);
            throw error;
        }
    }

    static async update(id, data) {
        const db = await connectDB();
        try {
            const validatedProduct = validateProduct(data);
            if (!validatedProduct.isValid) {
                console.error('Error in validation:', validatedProduct.errors); 
                throw new Error('Client data is invalid');
            }
            
            const query = `
                UPDATE products 
                SET name = $1, brand = $2, price = $3, quantity = $4
                WHERE id = $5
                
            `;
            const result = await db.query(query, [
                validatedProduct.data.name, 
                validatedProduct.data.brand,
                validatedProduct.data.price,
                validatedProduct.data.quantity,
                id
            ]);
            if(result.rowCount === 0) throw new Error('Id product not found');
            return result.rows[0];
        } catch (error) {
            console.error('Error in the update product function:', error.message);
            throw error;
        }
    }
    static async findAll() {
        const db = await connectDB();
        try {
            const query = `
                SELECT * 
                FROM products
            `;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in the find all products function:', error.message);
            throw error;
        }
    }
    static async findById(id) {
        const db = await connectDB();
        try {
            const query = `
                SELECT * 
                FROM products
                WHERE id = $1;      
            `;
            const result = await db.query(query, [id]);

            if (result.rowCount === 0) throw new Error('Product not found');
            return result.rows[0];
        } catch (error) {
            console.error('Error finding product with this id:', error.message);
            throw error;
        }
    }
}

module.exports = ProductRepository;