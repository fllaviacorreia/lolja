const connectDB = require('../config/db');
const { validateClient } = require('../validators/clientValidator');


class ClientRepository {

    static async save(data) {
        const db = await connectDB();
        try {
            
            const validatedClient = validateClient(data);
            
            if (!validatedClient.isValid) {
                console.error('Erro na validação:', validatedClient.errors); 
                throw new Error('Client data is invalid');
            }
            
            const query = `
                INSERT INTO clients (name, email, born_date) 
                VALUES ($1, $2, $3)    
                RETURNING *;
            `;
            
            const result = await db.query(query, [
                validatedClient.data.name, 
                validatedClient.data.email,
                validatedClient.data.bornDate
            ]);
            
            return result.rows[0];
        } catch (error) {
            console.error('Error inserting client:', error.message);
            throw error;
        } 
    }

    static async innactive(id) {
        const db = await connectDB();
        try {
            const query = `
                UPDATE clients 
                SET status = 'innactive'
                WHERE id = $1
                RETURNING *;
            `;
            const result = await db.query(query, [id]);

            if (result.rowCount === 0) throw new Error('Client not found');
            return result.rows[0];
        } catch (error) {
            console.error('Error innactive client:', error.message);
            throw error;
        }
    }

    static async update(id, data) {
        const db = await connectDB();
        try {
            const validatedClient = validateClient(data);
            if (!validatedClient.isValid) {
                console.error('Erro na validação:', validatedClient.errors); 
                throw new Error('Client data is invalid');
            }
            
            const query = `
                UPDATE clients 
                SET name = $1, email = $2
                WHERE id = $3
                
            `;
            const result = await db.query(query, [
                validatedClient.data.name, 
                validatedClient.data.email,
                id
            ]);
            if(result.rowCount === 0) throw new Error('Id client not found');
            return result.rows[0];
        } catch (error) {
            console.error('Error in the update client function:', error.message);
            throw error;
        }
    }

    static async findAll() {
        const db = await connectDB();
        try {
            const query = `
                SELECT * 
                FROM clients
            `;
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error in the find all client function:', error.message);
            throw error;
        }
    }

    static async findById(id) {
        const db = await connectDB();
        try {
            const query = `
                SELECT * FROM clients
                WHERE id = $1;      
            `;
            const result = await db.query(query, [id]);

            if (result.rowCount === 0) throw new Error('Client not found');
            return result.rows[0];
        } catch (error) {
            console.error('Error finding client with this id:', error.message);
            throw error;
        }
    }
}

module.exports = ClientRepository;