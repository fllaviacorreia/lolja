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
                RETURNING id;
            `;
            
            const result = await db.query(query, [
                validatedClient.data.name, 
                validatedClient.data.email,
                validatedClient.data.bornDate
            ]);
            console.log('Aqui')
            return result.rows[0].id;
        } catch (error) {
            console.error('Error inserting client:', error.message);
            throw error;
        } 
    }
}

module.exports = ClientRepository;