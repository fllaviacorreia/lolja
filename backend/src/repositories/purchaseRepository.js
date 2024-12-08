const connectDB = require('../config/db');
const { validatePurchase } = require('../validators/purchaseValidator');
const PurchaseService = require('../service/purchaseService');

class PurchaseRepository{

    static async save(data) {
        const db = await connectDB();
        try {
           
            const isValid = await PurchaseService.checkPurchase(data.id_product, data.id_client);

            if (!isValid) {
                throw new Error('Purchase error: invalid product or client');
            }

            const validatedPurchase = validatePurchase(data);

            if (!validatedPurchase.isValid) {
                console.error('Validation error:', validatedPurchase.errors); 
                throw new Error('Product data is invalid');
            }

           
            const query = `
                INSERT INTO purchases (id_product, id_client, total)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;

            const result = await db.query(query, [
                validatedPurchase.id_product,
                validatedPurchase.id_client,
                validatedPurchase.total,
            ]);
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting purchase:', error.message);
            throw error;
        }
    }
    static async findAll() {
        const db = await connectDB();
        try {
            const query = `
                SELECT * 
                FROM purchases
            `;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in the find all purchases function:', error.message);
            throw error;
        }
    }
}

module.exports = PurchaseRepository;